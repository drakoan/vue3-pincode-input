<script setup>
import VuePincodeInput from './plugin/PincodeInput.vue';
import { ref } from 'vue';

const pincode = ref('');
const isPinComplete = ref(false);

const custom = ref('');
const errorCounter = ref(0);

const secure = ref('');
const strict = ref('');
const fieldId = ref('');
const inputValue = ref('');
</script>

<template>
  <main class="main-wrapper">
    <h1>Vue3 Pincode Input</h1>
    <div class="default shadow">
      <h2>Default (4 digits), autofocus & complete events</h2>
      <hr />
      <VuePincodeInput
        v-model="pincode"
        autofocus
        @pincodeInputComplete="isPinComplete = true"
        @pincodeInputIncomplete="isPinComplete = false"
      />
      <div class="preview">pincode: {{ pincode }}</div>
      <div class="preview">is pin complete: {{ isPinComplete }}</div>
      <div class="code-preview">
        {{ `<VuePincodeInput
  v-model="pincode"
  @pincodeInputComplete="isPinComplete = true"
  @pincodeInputIncomplete="isPinComplete = false"
/>` }}
      </div>
    </div>
    <div class="custom shadow">
      <h2>Custom style, 6 digits, no autofocus & never autofocus on first empty field</h2>
      <hr />
      <VuePincodeInput
        v-model="custom"
        :digits="+6"
        autofocusOnFirstEmpty="never"
        input-class="rounded-full w-18 h-18 text-3xl
          text-gray-500 border-2 border-gray-200 shadow"
        success-class="border-2 border-green-400"
        spacing-class="mr-2"
      />
      <div class="preview">pincode: {{ custom }}</div>
      <div><i>Note: you can see never autofocus on first empty field
        if you start typing from second field</i></div>
      <div class="code-preview">
        {{ `<VuePincodeInput
  :digits="+6"
  autofocusOnFirstEmpty="never"
  input-class="rounded-full w-18 h-18 text-3xl
    text-gray-500 border-2 border-gray-200 shadow"
  success-class="border-2 border-green-400"
  spacing-class="mr-2"
/>` }}
      </div>
    </div>
    <div class="default shadow">
      <h2>Preview secure, errors counter & strict control of inputs</h2>
      <hr />
      <VuePincodeInput
        v-model="secure"
        :digits="+4"
        :preview="200"
        secure
        @pincodeInputInvalidInput="({ id, value }) => {
          fieldId = id;
          inputValue = value;
          errorCounter++;
        }"
        @pincodeInputUpdate="({ id, value, pincode }) => {
          strict = pincode;
          fieldId = id;
          inputValue = value;
        }"
        @pincodeInputIncomplete="pincode => strict = pincode"
      />
      <div class="preview">pincode (v-model): {{ secure }}</div>
      <div class="preview">pincode from event: {{ strict }}</div>
      <div class="preview">current input field id: {{ fieldId }}</div>
      <div class="preview">current input value: "{{ inputValue }}"</div>
      <div class="preview">errors: {{ errorCounter }} </div>
      <div class="code-preview">
        {{ `<VuePincodeInput
  v-model="secure"
  :digits="+4"
  :preview="200"
  secure
  @pincodeInputInvalidInput="({ id, value }) => {
    fieldId = id;
    inputValue = value;
    errorCounter++;
  }"
  @pincodeInputUpdate="({ id, value, pincode }) => {
    strict = pincode;
    fieldId = id;
    inputValue = value;
  }"
  @pincodeInputIncomplete="pincode => strict = pincode"
/>` }}
      </div>
    </div>
  </main>
  <footer>
    Make with ❤️ by &nbsp;
    <a href="https://www.npmjs.com/~siriphonnot" target="_blank">NottDev</a>
    &nbsp;&&nbsp;
    <a href="https://www.npmjs.com/~drakoan" target="_blank">DraKoan</a>
  </footer>
</template>

<style scoped>
.main-wrapper {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
@media screen and (max-width: 480px) {
  .main-wrapper {
    padding: 15px;
  }
}

.main-wrapper .default,
.main-wrapper .custom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 1px gray dotted;
  border-radius: 0.5rem;
}
.main-wrapper hr {
  width: 100%;
  border-bottom: none;
  border-top: 1px solid #cdcdcd;
  margin-bottom: 1rem;
}

.preview {
  background-color: #f0f0f0;
  min-width: 8rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
.code-preview {
  background: #1b1d22;
  border-radius: 5px;
  padding: 2rem;
  color: #ccc;
  max-width: 800px;
  width: 100%;
  white-space: pre-wrap;
}
footer {
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>