# Simple Store

This is a small store app made with React 19. It shows a few products and has a form to register a user. The product and registration requests are simulated in the app; there is no backend.

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
- `src/components/RegistrationForm.jsx` has the registration form and validation.
- `src/components/RegisteredUser.jsx` shows the user's name and email after registration.
- `src/context/UserContext.jsx` creates the user Context.

## React 19 features

- **`use()` and `<Suspense>`:** The product list reads a Promise with `use()`. While it waits, `<Suspense>` shows “Loading products…”. If loading fails, an error boundary shows a message.
- **`useActionState()`:** The registration form uses a form `action` to check the name, email, and password. It then waits briefly to act like a server request.
- **`useFormStatus()`:** The Register button uses this hook to show “Registering…” and disable itself while the form is being submitted.
- **Context:** The app shares the registered user's name and email with `<UserContext value={...}>`. The `RegisteredUser` component reads them with `useContext()`.
- **Asset loading:** `preconnect()` starts a connection to the site that hosts the product images. `preload()` gives the first product image priority. The other images load when needed.
- **Page title and description:** The `<title>` and description `<meta>` are set in `App.jsx`. React 19 puts them in the document head.

The password is checked by the form but is not saved in Context.
