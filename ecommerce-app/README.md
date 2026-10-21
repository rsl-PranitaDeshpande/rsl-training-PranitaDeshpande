# Simple Store

This is a small store app made with React 19. It shows products, provides a product details and add-to-cart flow, and has a form to register a user. Product loading, registration, and cart requests are simulated in the app; there is no backend.

## Run the app

From the `ecommerce-app` folder, run:

```sh
npm install
npm run dev
```

To check the app, run `npm run build` and `npm run lint`.

## Files

- `src/App.jsx` puts the page sections together and provides the registered user.
- `src/data/products.js` has the sample products and simulates loading them.
- `src/components/ProductList.jsx` shows the products, loading message, and error message.
- `src/components/SearchInput.jsx` is a reusable search field that accepts `ref` directly as a prop.
- `src/components/RegistrationForm.jsx` has the registration form and validation.
- `src/components/RegisteredUser.jsx` shows the user's name and email after registration.
- `src/context/UserContext.jsx` creates the user Context.

## React 19 features

- **`use()` and `<Suspense>`:** The product list reads a Promise with `use()`. While it waits, `<Suspense>` shows “Loading products…”. If loading fails, an error boundary shows a message.
- **`useActionState()`:** The registration form uses a form `action` to check the name, email, and password. It then waits briefly to act like a server request.
- **`useFormStatus()`:** The Register button uses this hook to show “Registering…” and disable itself while the form is being submitted.
- **`useOptimistic()`:** Adding a product immediately increments the cart count while a simulated request runs. A failed request leaves the actual count unchanged and displays an error.
- **Ref as a prop and callback-ref cleanup:** The product search component receives its input ref directly and the page uses it to focus the search field. Product Details attaches pointer listeners through a callback ref and removes them in the ref's cleanup function.
- **Context:** The app shares the registered user's name and email with `<UserContext value={...}>`. The `RegisteredUser` component reads them with `useContext()`.
- **Asset loading:** `preconnect()` starts a connection to the site that hosts the product images. `preload()` gives the first product image priority. The other images load when needed.
- **Page title and description:** The `<title>` and description `<meta>` are set in `App.jsx`. React 19 puts them in the document head.

The password is checked by the form but is not saved in Context.

## Server and Client Components

This app uses Vite, so its components run on the client; it does not configure React Server Components. In an RSC-capable framework such as Next.js, the product catalog and Product Details presentation could be Server Components: they can load product data close to the data source and render the product name, price, description, and image without sending that static presentation logic to the browser. The interactive Add to Cart control must be a Client Component because it handles clicks and uses client-side state and `useOptimistic()`. A server-rendered product page can include that small Client Component, passing it the product identifier and initial cart information. The client can then submit the cart action to a server endpoint while the server-rendered catalog and details remain the source of product content.

## React Compiler

React Compiler analyzes component code and automatically applies memoization where it can avoid unnecessary work, reducing the need to add `useMemo`, `useCallback`, or `memo` by hand. When configured for this app's build, it could avoid recalculating the filtered product list or re-rendering product cards when unrelated registration state changes, provided their inputs have not changed. React Compiler is not installed or configured in this Vite project, so this describes a potential optimization rather than an optimization currently active in the app.
