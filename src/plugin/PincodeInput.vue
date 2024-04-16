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
import { computed, ref, watch, onMounted, nextTick, watchEffect } from 'vue';

const CMP_NAME='vue-pincode-input';

const emits = defineEmits([
  'pincode-input-update',
  'pincode-input-invalid-input',
  'pincode-input-complete',
  // Note: no need to add to readme! Default component compatibility with v-model:
  'update:modelValue'
]);

const props = defineProps({
  cmpName: {
    type: String,
    default: () => `pincode-input-${Math.ceil(Math.random()*9999)}`
  },
  digits: {
    type: Number,
    default: 4,
    validator: n => n > 0 && Number.isInteger(n)
  },
  placeholder: { type: String, default: '' },
  secure: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  autofocusOnFirstEmpty: {
    type: [String],
    default: 'always',
    validator: v => ['never', 'onLastFilled', 'always'].includes(v)
  },
  inputClass: { type: String, default: 'default' },
  successClass: { type: String, default: '' },
  spacingClass: { type: String, default: '' },
  preview: { type: Number, default: 0 },
  // Note: no need to add to readme! Default component compatibility with v-model:
  modelValue: { type: String, default: ''},
});

const choosenId = ref(0);
const watchers = ref({});
const inputs = ref([]);
const inputsRefs = ref({});

const setInputRef = ({ el, id }) => inputsRefs.value[id] = el;

const setInputWatcher = id => watchers.value[id] = watch(
  () => inputs.value[id],
  newVal => handleInputChange(id, newVal));

const init = () => {
  inputs.value = Array(props.digits).fill('');
  for (let i = 0; i < props.digits; i++) setInputWatcher(i);
  if (props.autofocus && inputsRefs.value[0]) inputsRefs.value[0].focus();
};
onMounted(() => nextTick(() => init()));

const focusInputById = id => {
  const el = inputsRefs.value[id];
  if (!el) return;

  el.focus();
  el.select();
  choosenId.value = id;
};

const focusPreviousInput = () => {
  if (choosenId.value !== 0) focusInputById(choosenId.value - 1);
};

const focusNextInput = () => {
  const nextId = choosenId.value + 1;
  if (nextId !== props.digits) focusInputById(nextId);
};

const pincode = computed(() => inputs.value.join(''));

const handleInputChange = (id, newVal) => {
  if (!isInputValid(newVal)) {
    inputs.value[id] = '';
    emits('pincode-input-invalid-input', ({ id, value: newVal }));
    return;
  }
  emits('pincode-input-update', ({ id, value: newVal, pincode: pincode.value }));
  emits('update:modelValue', pincode.value); // Default cmp compatibility with v-model

  const isLastInputFocused = +id === props.digits - 1;
  if (isComplete.value) return isLastInputFocused ? focusInputById(0) : focusNextInput();

  const rule = props.autofocusOnFirstEmpty;
  if ((rule === 'always' && !isRightFilled.value) ||
    (rule === 'onLastFilled' && !isLastInputFocused) ||
    rule === 'never' ) return focusNextInput();
  
  if (firstEmptyInputId.value !== false) focusInputById(firstEmptyInputId.value);
};

const handleDelete = ({ e, id, next, previous }) => {
  e.preventDefault();
  if (inputs.value[id]) return inputs.value[id] = '';
  if (previous) focusPreviousInput();
  if (next) focusNextInput();
};

const handleKeyDown = ({ id, e }) => {
  switch (e.keyCode) {
  case 8: return handleDelete({ id, e, previous: true }); // Backspace key
  case 46: return handleDelete({ id, e, next: true }); // "Delete" key
  case 37: return focusPreviousInput(); // left arrow key 
  case 39: return focusNextInput(); // right arrow key
  default: break;
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

const firstEmptyInputId = computed(() => {
  const first = inputs.value.findIndex(v => !v);
  return first === -1 ? false : first;
});

const checkRightIsFilled = id => {
  const { length } = inputs.value;
  const atRigthFull = inputs.value
    .slice(id + 1, length)
    .filter( i => !!i);
  return atRigthFull.length + 1 === length - id;
};

const isRightFilled = computed(() => checkRightIsFilled(choosenId.value));

const isComplete = computed(() => pincode.value.length === props.digits);
watchEffect(() => {
  if (isComplete.value) emits(('pincode-input-complete'), pincode.value);
});

const inputClasses = computed(() =>
  props.inputClass + (isComplete.value ? ` ${props.successClass}` : ''));
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