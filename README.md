# vue3-pincode-input

> Pincode input component for Vue 3 [Live demo](https://siriphonnott.github.io/vue-pincode-input/)

![vue3-pincode-input](https://siriphonnott.github.io/vue-pincode-input/banner.png)


## Table of Contents

* [___Demo___](#demo)
* [___Features___](#features)
* [___Usage___](#usage)
* [___Props___](#props)
* [___Authors && Contributors___](#authors-&&-Contributors)
* [___License___](#license)

## Demo

Demo on [GitHub Pages](https://siriphonnott.github.io/vue-pincode-input/)

## Features

- Be lightweight, powerful and easy to use
- Support for add your custom class
- Override-friendly styles
- Configurable length (pincode length)
- Auto moving focus when filling
- Auto moving focus when deleting
- Call for native numeric keyboard on mobile
- Optional secure mode (password input type)
- Can add class for pincode input
- Can add success class of pincode input
- Support Vue 3 only

## Usage

```
  npm i vue3-pincode-input
```

or with yarn

```
  yarn add vue3-pincode-input
```

Import for use component:

```
import VuePincodeInput from 'vue3-pincode-input';
```

```
<VuePincodeInput v-model="pincode" />
```

Also can use your class for custom component [See more props](#props)

```
<VuePincodeInput
  v-model="pincode"
  input-class="rounded-full w-18 h-18 text-3xl text-gray-500 border-2 border-gray-200 shadow"
  success-class="border-2 border-green-400"
  spacing-class="mr-2"
  autofocus
/>
```

**Attention**: you should use _'input.vue-pincode-input'_ instead _'.vue-pincode-input'_ in order to rule specificity was higher

```
<style>
div.vue-pincode-input-wrapper {
  // any styles you want for wrapper
}

input.vue-pincode-input {
  // any styles you want for each input
}
<style>
```

## Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 50px;">Name</th>
      <th style="width: 50px;">Type</th>
      <th style="width: 50px;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>digits</td>
      <td>Number</td>
      <td>4</td>
      <td>length of pincode</td>
    </tr>
    <tr>
      <td>autofocusOnFirstEmpty</td>
      <td>String</td>
      <td>'always'</td>
      <td>auto-focuses on the first empty input field based on the following options:
        <br><b>'never'</b> - never;
        <br><b>'onLastFilled'</b> - when filled the rightmost field;
        <br><b>'always'</b> - when all input fields to the right of the current one are filled</td>
    </tr>
    <tr>
      <td>autofocus</td>
      <td>Boolean</td>
      <td>true</td>
      <td>auto focus first input</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td>String</td>
      <td></td>
      <td>placeholder pincode input</td>
    </tr>
    <tr>
      <td>secure</td>
      <td>Boolean</td>
      <td>false</td>
      <td>password input type</td>
    </tr>
    <tr>
      <td>cmpName</td>
      <td>String</td>
      <td>pincode-input-[4 random digits]</td>
      <td>component name for set DOM elements ids</td>
    </tr>
    <tr>
      <td>inputClass</td>
      <td>String</td>
      <td></td>
      <td>class for pincode input</td>
    </tr>
    <tr>
      <td>successClass</td>
      <td>String</td>
      <td></td>
      <td>class for pincode input success</td>
    </tr>
    <tr>
      <td>spacingClass</td>
      <td>String</td>
      <td></td>
      <td>class for spacing  between input</td>
    </tr>
  </tbody>
</table>

## Events

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 50px;">Name</th>
      <th style="width: 50px;">Data & types</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>@pincodeInputUpdate</td>
      <td>Object ({}) with fields:
        <br><b>'id'</b> Number (integer);
        <br><b>'value'</b> String ('integer' with length === 1 OR empty string '');
        <br><b>'pincode'</b> String (with length from 1 to props.digits numbers OR empty string '');
      </td>
      <td>current input & result of entering pin code on this moment</td>
    </tr>
    <tr>
      <td>@pincodeInputInvalidInput</td>
      <td>Object ({}) with fields:
        <br><b>'id'</b> Number (integer);
        <br><b>'value'</b> String (with length === 1);
      </td>
      <td>current invalid input value with input field id</td>
    </tr>
    <tr>
      <td>@pincodeInputComplete</td>
      <td>String (with length === props.digits numbers)</td>
      <td>result of entering pin code</td>
    </tr>
    <tr>
      <td>@pincodeInputIncomplete</td>
      <td>Boolean</td>
      <td>true</td>
    </tr>
  </tbody>
</table>

**Note**:
The v-model is updated when the pin is still being filled in and when it is already completed and edited.
But the v-model stops updating when the pincode is completed and one of the fields is cleared,
so you can use @pincodeInputUpdate and @pincodeInputIncomplete events to watch for changes.

## Authors && Contributors

- [siriphonnot](https://github.com/siriphonnott)
- [drakoan](https://github.com/drakoan)

## License

[The MIT License](http://opensource.org/licenses/MIT)
