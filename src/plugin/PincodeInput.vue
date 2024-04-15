<template>
  <div
    :id="cmpName"
    :class="`${CMP_NAME}-wrapper`"
  >
    <input
      v-for="(_, id) in inputs" :key="id"
      v-model.trim="inputs[id]"
      :id="`${cmpName}-${id}`"
      :class="[CMP_NAME, inputClasses, spacingClass]"
      :ref="el => setInputRef({ id, el })"
      :type="secure ? 'password' : 'tel'"
      :placeholder="placeholder"
      maxlength="1"
      @focus="() => choosenId = id"
      @keydown="e => handleKeyDown({ id, e })"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, nextTick } from 'vue';

const CMP_NAME='vue-pincode-input';

const props = defineProps({
  cmpName: {
    type: String,
    default: () => `pincode-input-${Math.ceil(Math.random()*9999)}`
  },
  modelValue: { type: String, default: '' },
  digits: {
    type: Number,
    default: 4,
    validator: n => n > 0 && Number.isInteger(n)
  },
  placeholder: { type: String, default: '' },
  secure: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  inputClass: { type: String, default: 'default' },
  successClass: { type: String, default: '' },
  spacingClass: { type: String, default: '' },
  preview: { type: Number, default: 0 },
});

const choosenId = ref(0);
const watchers = ref({});
const inputs = ref([]);
const inputsRefs = ref({});

const setInputRef = ({ el, id }) => inputsRefs.value[id] = el;

const getInitialInputs = () => {
  const { modelValue, digits } = props;
  if (!modelValue) return Array(digits).fill('');

  const difLength = digits - modelValue.length;
  if (difLength === 0) return [...modelValue];

  return difLength < 0 ?
    [...modelValue.slice(0, digits)] :
    [...modelValue, ...(Array(difLength).fill(''))];
};

const setInputWatcher = id => watchers.value[id] = watch(
  () => inputs.value[id],
  newVal => handleInputChange(id, newVal));

const init = () => {
  inputs.value = getInitialInputs();
  for (let i = 0; i < inputs.value.length; i++) setInputWatcher(i);
  if (props.autofocus && inputsRefs.value[0]) inputsRefs.value[0].focus();
};
onMounted(() => nextTick(() => init()));

// TODO: refact with watch reactivity from this line:
const focusPreviousInput = () => {
  if (choosenId.value === 0) return;
  focusInputById(choosenId.value - 1);
};

const focusNextInput = () => {
  const nextId = choosenId.value + 1;
  if (nextId === props.digits) return;
  focusInputById(nextId);
};

// note: this method will have to react of focused input id:
const focusInputById = id => {
  const el = inputsRefs.value[id];
  if (el) {
    el.focus();
    el.select();
  }
  choosenId.value = id;
};
// to upper line.
// end of code, which need to refact
// 

const handleKeyDown = ({ id, e }) => {
  // TODO: add DELETE btn with focus next input
  switch (e.keyCode) {
  case 46: // "Delete" key
    return handleDelete({ id, e, next: true });
  case 8: // Backspace key
    return handleDelete({ id, e, previous: true });
  case 37: // left arrow key 
    return focusPreviousInput();
  case 39: // right arrow key
    return focusNextInput();
  default:
    break;
  }
  const currVal = inputs.value[choosenId.value];
  if (currVal) return inputs.value[choosenId.value] = '';

  const { preview, secure } = props;
  if (preview && secure) {
    e.target.type = 'tel';
    setTimeout(() => e.target.type = 'password', preview);
  }
};

const isInputValid = str => str ? !!str.match('^\\d{1}$') : false;

const emits = defineEmits(['update:modelValue']);

const firstEmptyInputId = computed(() => {
  const first = inputs.value.findIndex(v => !v);
  return first === -1 ? false : first;
});

const handleInputChange = (id, newVal) => {
  emits('update:modelValue', inputs.value.join(''));
  if (!isInputValid(newVal)) return inputs.value[id] = '';
  // Check all input filled, but only on last input filled
  // TODO: refact to
  // 1.separate fn, auto focusing another input;
  // 2. add feat of focusing first empty input on all cases
  const isLastInputFocused = +id === props.digits - 1;
  if (!isLastInputFocused) return focusNextInput();

  if (firstEmptyInputId.value !== false) focusInputById(firstEmptyInputId.value);
};

const handleDelete = ({ e, id, next, previous }) => {
  const isThisCellEmpty = !inputs.value[id];
  if (isThisCellEmpty) {
    e.preventDefault();
    if (next) focusNextInput();
    if (previous) focusPreviousInput();
  }
};

const isValid = computed(() => inputs.value.join('').length === props.digits);
const inputClasses = computed(() =>
  props.inputClass + (isValid.value ? ` ${props.successClass}` : ''));
</script>
<style>
.vue-pincode-input-wrapper {
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
}
.vue-pincode-input-wrapper.is-success .vue-pincode-input {
  border: 1px solid #62c633;
}

.vue-pincode-input-wrapper.is-error .vue-pincode-input {
  border: 1px solid #da3945;
}

.vue-pincode-input-wrapper .vue-pincode-input {
  text-align: center;
  vertical-align: middle;
}

.vue-pincode-input-wrapper .vue-pincode-input.default {
  width: 65px;
  height: 65px;
  border: 1px solid #c4c4c4;
  font-size: 1.8rem;
  transition: all 0.3s;
}

.vue-pincode-input-wrapper .vue-pincode-input.default:focus {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.vue-pincode-input-wrapper .vue-pincode-input.default:not(:last-child) {
  margin-right: 0.5rem;
}

.vue-pincode-input-wrapper .vue-pincode-input:focus {
  outline-style: none;
}
</style>