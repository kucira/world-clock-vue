<script setup lang="ts">
defineProps(["subtitle", "title", "onOk", "onCancel"]);
</script>

<template>
  <div
    className="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div
        className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
      >
        <div
          className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {{ title }}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{{ subtitle }}</p>
                </div>
                <slot></slot>
              </div>
            </div>
          </div>

          <div
            className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              @click="onOk"
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Ok
            </button>
            <button
              @click="onCancel"
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
