import React from "react";
import * as Yup from "yup";
import { Form, FormField } from "../component/form/Form";

const allFieldOptions = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" },
];
const colors = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
];

const countries = [
    { name: "USA", code: "US" },
    { name: "India", code: "IN" },
    { name: "Germany", code: "DE" }
];

const icons = [
    { label: "User", value: "pi pi-user" },
    { label: "Search", value: "pi pi-search" }
];

const treeOptions = [
    {
        key: '0',
        label: 'Documents',
        children: [
            {
                key: '0-0',
                label: 'Work',
                children: [{ key: '0-0-0', label: 'Expenses.doc' }, { key: '0-0-1', label: 'Resume.doc' }]
            },
            {
                key: '0-1',
                label: 'Home',
                children: [{ key: '0-1-0', label: 'Invoices.txt' }]
            }
        ]
    }
];

const formFields: FormField[] = [
    { name: "autocomplete", label: "Autocomplete", type: "autocomplete", options: countries, optionLabel: "name", col: "col-12 md:col-4" },
    { name: "calendar", label: "Calendar", type: "calendar", col: "col-12 md:col-4", showIcon: true },
    { name: "cascadeselect", label: "Cascade Select", type: "cascadeselect", col: "col-12 md:col-4" },
    { name: "chips", label: "Chips", type: "chips", col: "col-12 md:col-4" },
    { name: "colorpicker", label: "Color Picker", type: "colorpicker", col: "col-12 md:col-4", format: "hex" },
    { name: "dropdown", label: "Dropdown", type: "dropdown", options: countries, optionLabel: "name", optionValue: "code", col: "col-12 md:col-4" },
    { name: "iconfield", label: "IconField", type: "iconfield", icon: "pi pi-user", placeholder: "With icon", col: "col-12 md:col-4" },
    { name: "inputmask", label: "Input Mask", type: "inputmask", mask: "(999) 999-9999", col: "col-12 md:col-4" },
    { name: "inputswitch", label: "Input Switch", type: "inputswitch", col: "col-12 md:col-4" },
    { name: "inputnumber", label: "Input Number", type: "inputnumber", col: "col-12 md:col-4", min: 1, max: 100 },
    { name: "inputotp", label: "Input OTP", type: "inputotp", length: 4, col: "col-12 md:col-4" },
    { name: "inputtext", label: "Input Text", type: "inputtext", col: "col-12 md:col-4" },
    { name: "inputtextarea", label: "Input Textarea", type: "inputtextarea", rows: 3, col: "col-12 md:col-4" },
    { name: "knob", label: "Knob", type: "knob", min: 0, max: 100, col: "col-12 md:col-4" },
    { name: "listbox", label: "ListBox", type: "listbox", options: allFieldOptions, optionLabel: "label", optionValue: "value", col: "col-12 md:col-4" },
    { name: "mention", label: "Mention", type: "mention", options: ["@Abhi", "@John", "@Jane"], col: "col-12 md:col-4" },
    { name: "multiselect", label: "MultiSelect", type: "multiselect", options: allFieldOptions, optionLabel: "label", optionValue: "value", col: "col-12 md:col-4" },
    { name: "multistate", label: "MultiStateCheckbox", type: "multistate", options: [
        { value: 'yes', icon: 'pi pi-check' },
        { value: 'no', icon: 'pi pi-times' },
        { value: 'maybe', icon: 'pi pi-question' }
    ], col: "col-12 md:col-4" },
    { name: "checkbox", label: "Checkbox", type: "checkbox", col: "col-12 md:col-4" },
    { name: "checkboxgroup", label: "Checkbox Group", type: "checkboxgroup", options: colors, col: "col-12 md:col-4" },
    { name: "password", label: "Password", type: "password", toggleMask: true, feedback: true, col: "col-12 md:col-4" },
    { name: "radiobutton", label: "RadioButton", type: "radiobutton", options: allFieldOptions, col: "col-12 md:col-4" },
    { name: "rating", label: "Rating", type: "rating", cancel: false, col: "col-12 md:col-4" },
    { name: "selectbutton", label: "SelectButton", type: "selectbutton", options: allFieldOptions, optionLabel: "label", optionValue: "value", col: "col-12 md:col-4" },
    { name: "slider", label: "Slider", type: "slider", min: 0, max: 100, col: "col-12 md:col-4" },
    { name: "treeselect", label: "TreeSelect", type: "treeselect", col: "col-12 md:col-4" },
    { name: "tristatecheckbox", label: "TriState Checkbox", type: "tristatecheckbox", col: "col-12 md:col-4" },
    { name: "togglebutton", label: "ToggleButton", type: "togglebutton", onLabel: "On", offLabel: "Off", col: "col-12 md:col-4" }
];

const initialValues = {
    autocomplete: "",
    calendar: null,
    cascadeselect: null,
    chips: [],
    colorpicker: null,
    dropdown: "",
    iconfield: "",
    inputmask: "",
    inputswitch: false,
    inputnumber: 0,
    inputotp: "",
    inputtext: "",
    inputtextarea: "",
    knob: 50,
    listbox: "",
    mention: "",
    multiselect: [],
    multistate: null,
    checkbox: false,
    checkboxgroup: [],
    password: "",
    radiobutton: "",
    rating: 0,
    selectbutton: "",
    slider: 0,
    treeselect: null,
    tristatecheckbox: null,
    togglebutton: false
};

const validationSchema = Yup.object({
    autocomplete: Yup.string().required("Required"),
    calendar: Yup.date().nullable().required("Required"),
    cascadeselect: Yup.mixed().required("Required"),
    chips: Yup.array().min(1, "Enter at least one value"),
    colorpicker: Yup.string().nullable().required("Required"),
    dropdown: Yup.string().required("Required"),
    iconfield: Yup.string().required("Required"),
    inputmask: Yup.string().required("Required"),
    inputswitch: Yup.boolean(),
    inputnumber: Yup.number().min(1, "Min 1").max(100, "Max 100").required("Required"),
    inputotp: Yup.string().required("Required"),
    inputtext: Yup.string().required("Required"),
    inputtextarea: Yup.string().required("Required"),
    knob: Yup.number().required("Required"),
    listbox: Yup.string().required("Required"),
    mention: Yup.string().required("Required"),
    multiselect: Yup.array().min(1, "Select at least one").required("Required"),
    multistate: Yup.string().required("Required"),
    checkbox: Yup.boolean(),
    checkboxgroup: Yup.array().min(1, "Select at least one color"),
    password: Yup.string().min(4, "Min 4 characters").required("Required"),
    radiobutton: Yup.string().required("Required"),
    rating: Yup.number().min(1, "Rate at least 1").required("Required"),
    selectbutton: Yup.string().required("Required"),
    slider: Yup.number().min(1, "Min 1").max(100, "Max 100").required("Required"),
    treeselect: Yup.mixed().required("Required"),
    tristatecheckbox: Yup.mixed().required("Required"),
    togglebutton: Yup.boolean()
});

export default function FormDemo() {
    return (     
      <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          fields={formFields}
          onSubmit={values => {
              alert(JSON.stringify(values, null, 2));
          }}
      />
    );
}