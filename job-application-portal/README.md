# Job Application Form – React Hook Form & Zod

This project is a multi-step job application form for a company careers portal, built using React, TypeScript, React Hook Form, and Zod.

The application guides candidates through a 5-step form, collecting personal, educational, professional, and application-related details. It includes client-side validation, cross-field validation, dynamic field lists, conditional fields, and simulated server responses.

## How to Run the Project

### 1. Clone the Repository

```bash
git clone <your-github-repo-link>
cd job-application-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open the application at `http://localhost:5173` or the URL displayed in the terminal.

### 4. Run TypeScript Type Checking

```bash
npx tsc --noEmit
```

## Schema Organization

All validation logic is maintained separately from UI components in the `src/features/job-application/schemas/` directory.

- **jobApplication.schema.ts:** Defines individual Zod schemas for each logical step, including `personalDetailsSchema`, `educationStepSchema`, `experienceStepSchema`, and `applicationDetailsSchema`.
- **Schema Composition:** Individual schemas are combined into a master `jobApplicationSchema` using `.shape` and `.and()`, including discriminated union handling for Fresher and Experienced candidates.
- **Type Inference:** TypeScript types are inferred directly from the master Zod schema using `z.infer<typeof jobApplicationSchema>`, avoiding manually maintained interfaces and keeping validation and types in sync.

## Validation Mode

The form uses React Hook Form's `mode: "onTouched"`.

This mode validates fields when users interact with them and move away from them. Once a field has been touched, validation feedback updates as the user corrects their input.

This approach provides a balance between user experience and validation feedback:

- `onSubmit` delays validation feedback until form submission.
- `onChange` validates on every keystroke, which can be distracting.
- `onTouched` provides feedback after the user has interacted with a field, without being overly intrusive.

## Form State Management

The entire multi-step form is managed through a single `useForm` instance in `App.tsx`.

- **Centralized State:** A single form instance maintains all candidate details throughout the application.
- **Form Context:** `FormProvider` makes the form methods and state accessible to child components. Individual steps use `useFormContext()` to access the required methods and validation errors.
- **Step Navigation:** The `trigger()` method validates only the fields belonging to the current step before allowing navigation to the next step.
- **Data Preservation:** Form values remain available when navigating between steps, without requiring an external state management library such as Redux or Zustand.

## Performance Optimizations

The implementation avoids unnecessary component re-renders in three key areas.

**1. Uncontrolled Inputs Using `register`**

Native HTML inputs are connected to React Hook Form using `register`. This avoids managing every keystroke through React component state and reduces unnecessary re-renders.

**2. Isolated Subscriptions Using `useWatch`**

Conditional fields, such as those displayed based on the candidate type (Fresher or Experienced), use `useWatch` within specific child components. This limits re-renders to the components that depend on the watched values.

**3. Fine-Grained Form State Subscriptions**

Instead of subscribing to the entire `formState` at the root level, individual components access only the required properties, such as `isSubmitting` and field-level validation errors, through `useFormContext()`.

## Incomplete Features and Future Improvements

**1. Resume File Upload**

Resume attachments (PDF files) are not implemented, as file uploads were outside the scope of the project requirements. Portfolio and GitHub links are used instead.

**2. Persistent Form Drafts**

Form data is maintained during step navigation but is not persisted across page reloads. Integrating `localStorage` would allow candidates to save their progress and resume the application later.