import React from "react";
import { FormTextField } from "../../../components/form/FormTextField";

export const Step1PersonalDetails: React.FC = () => (
  <fieldset style={{ border: "none", padding: 0 }}>
    <legend><h2>Step 1: Personal Details</h2></legend>
    <FormTextField name="fullName" label="Full Name" />
    <FormTextField name="email" label="Email Address" type="email" />
    <FormTextField name="phone" label="Phone Number (10 digits)" />
    <FormTextField name="dob" label="Date of Birth" type="date" />
    <FormTextField name="currentCity" label="Current City" />
  </fieldset>
);