# Using Modals in Zoho Desk

## Quick Start

### 1. Create a component for the modal

```jsx
// Example: @/components/QuickMergeModal.tsx

import ZOHODESK from '../types/ZohoDesk/ZohoDesk';
import { Button } from './Button';
import { Modal } from './Modal/Modal';

export const QuickMergeModal = () => (
  <Modal<any>>
    {(parentData) => (
      <div className="flex flex-col">
        <h1 className="text-blue-600">Quick Merge Modal</h1>
        <Button
          color="red"
          onClick={() => {
            ZOHODESK.invoke('MODAL_CLOSE');
          }}
        >
          Close Modal
        </Button>
      </div>
    )}
  </MoUsing Modals in Zoho DeskQuick Start

### 2. Create a host React Script for the modal

This script binds the component created above in the to the root element in the html file for the modal (created next)

```tsx
// Example: @/quickMergeModal.tsx
import { QuickMergeModal } from '@/components/QuickMergeModal';
import './tailwind.css';
import { createRoot } from 'react-dom/client';

const modalRootElement = document.getElementById('modal-root');
const modalRoot = createRoot(modalRootElement!);

modalRoot.render(<QuickMergeModal />);
```

## 3. Create a host Html file for the modal

This is what will be iframed into a modal window by the Zoho Desk App.

**Important:** Make sure thew script tag references the ZOHO SDK and the compiled js output of the component (set up in next step)

```html
   <script src="https://js.zohostatic.com/support/developer_sdk/v1/js/ZohoDeskClientSDK.min.js"></script>
   <script src="./js/quickMergeModal.js" charset="utf-8"></script>
```

```html
<!-- Example: root/app/quickMeregModal.html-->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quick Merge Modal</title>
  </head>
  <body>
    <div id="modal-root"></div>
    <script src="https://js.zohostatic.com/support/developer_sdk/v1/js/ZohoDeskClientSDK.min.js"></script>
    <script src="./js/quickMergeModal.js" charset="utf-8"></script>
  </body>Using Modals in Zoho DeskQuick Start

### 4. Update the webpack config to compile the React and Typescript

```js
// webpack.config.js
let path = require('path');

let projectRootDir = process.cwd();
let sourceFolder = 'src';
let outputFolder = 'app';

module.exports = (mode = 'production') => ({
  entry: {
  ...
    quickMergeModal: path.join(
      projectRootDir,
      sourceFolder,
      'quickMergeModal.tsx'
    )
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: path.join(projectRootDir, outputFolder),
    publicPath: './'
  },
Using Modals in Zoho DeskQuick Start

### 5. Invoke the modal somewhere in the extension

```tsx
  <button
            className="bg-blue-600 text-white"
            onClick={() => {
              createModal<Ticket>(
                app,
                '/app/quickMergeModal.html',
                'Quick Merge',
                ticket
              );
            }}
          >
            Quick Merge
          </button>
```

## Helper Components and Functions

Modals in Zoho Desk require a fair degree of wiring up, I've created some helpers.

### `createModal()`

The `createModal` function is a helper function that simplifies the process of creating modals in Zoho Desk. It wraps the ZohoDesk calls to create a modal and works with the Modal Component to easily feed data from the calling function.

#### Parameters

The `createModal` function takes four parameters:

1. `app`: This is the application context.
2. `path`: This is the path to the HTML file for the modal. For example, '/app/quickMergeModal.html'.
3. `title`: This is the title of the modal. For example, 'Quick Merge'.
4. `data`: This is the data that will be passed to the modal. The data type is generic, so it can be any type of data. In the example, it's a `Ticket` object.

#### Usage

Here's an example of how to use the `createModal` function:

```ts
createModal<Ticket>(
  app,
  '/app/quickMergeModal.html',
  'Quick Merge',
  ticket
);
```

### `Modal` Component

The `Modal` component is a generic component that wraps the provided content and allows for handling of data from the widget that opened the modal. It is used in conjunction with `createModal<T>` on the parent widget.

#### Props

The `Modal` component accepts the following props:

- `children`: A function that returns a React node. This function receives the parent data as an argument.

#### Usage

Here's an example of how to use the `Modal` component:

```tsx
<Modal<Ticket>
  {(parentData) => (
    <div>
      <h1>Ticket Modal</h1>
      {parentData && (
        <p>Ticket ID: {parentData.data.ticketId}</p>
      )}
    </div>
  )}
</Modal<Ticket>
```
