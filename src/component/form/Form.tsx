import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { classNames } from "primereact/utils";
import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import { CascadeSelect } from "primereact/cascadeselect";
import { Chips } from "primereact/chips";
import { ColorPicker } from "primereact/colorpicker";
import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputMask } from "primereact/inputmask";
import { InputSwitch } from "primereact/inputswitch";
import { InputNumber } from "primereact/inputnumber";
import { InputOtp } from "primereact/inputotp";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Knob } from "primereact/knob";
import { ListBox } from "primereact/listbox";
import { Mention } from "primereact/mention";
import { MultiSelect } from "primereact/multiselect";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";
import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
import { RadioButton } from "primereact/radiobutton";
import { Rating } from "primereact/rating";
import { SelectButton } from "primereact/selectbutton";
import { Slider } from "primereact/slider";
import { TreeSelect } from "primereact/treeselect";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";

// Define field types and options
type FieldType =
    | "autocomplete"
    | "calendar"
    | "cascadeselect"
    | "chips"
    | "colorpicker"
    | "dropdown"
    | "iconfield"
    | "inputmask"
    | "inputswitch"
    | "inputnumber"
    | "inputotp"
    | "inputtext"
    | "inputtextarea"
    | "knob"
    | "listbox"
    | "mention"
    | "multiselect"
    | "multistate"
    | "checkbox"
    | "checkboxgroup"
    | "password"
    | "radiobutton"
    | "rating"
    | "selectbutton"
    | "slider"
    | "treeselect"
    | "tristatecheckbox"
    | "togglebutton";

export type FieldConfig = {
    name: string;
    label: string;
    type: FieldType;
    col?: string; // PrimeFlex col e.g. "col-12 md:col-4"
    options?: any[]; // For dropdowns, select, etc.
    optionLabel?: string;
    optionValue?: string;
    mask?: string;
    icon?: string;
    [key: string]: any; // For extra props specific to the component
};

export type FormProps<T> = {
    initialValues: T;
    validationSchema: Yup.ObjectSchema;
    fields: FieldConfig[];
    onSubmit: (values: T, helpers: FormikHelpers<T>) => void | Promise<void>;
    submitLabel?: string;
    resetLabel?: string;
};

export function Form<T extends Record<string, any>>({
    initialValues,
    validationSchema,
    fields,
    onSubmit,
    submitLabel = "Submit",
    resetLabel = "Reset"
}: FormProps<T>) {
    const formik = useFormik<T>({
        initialValues,
        validationSchema,
        onSubmit,
    });

    // For autocomplete and mention demo
    const [autoValues, setAutoValues] = React.useState<{ [key: string]: any[] }>({});

    // For cascadedemo
    const [cascadeOptions, setCascadeOptions] = React.useState<any[]>([]);

    // For treeselect demo
    const [treeOptions, setTreeOptions] = React.useState<any[]>([]);

    React.useEffect(() => {
        // Example setup for cascade and tree options (you can replace with your own fetch)
        setCascadeOptions([
            {
                code: "US",
                name: "United States",
                states: [
                    {
                        code: "CA",
                        name: "California",
                        cities: [{ code: "LA", name: "Los Angeles" }]
                    }
                ]
            }
        ]);
        setTreeOptions([
            {
                key: "0",
                label: "Documents",
                children: [
                    { key: "0-0", label: "Work" },
                    { key: "0-1", label: "Home" }
                ]
            }
        ]);
    }, []);

    // Helper to handle autocomplete/mention filtering
    const handleAutoComplete = (fieldName: string, event: any) => {
        // Simple filter demo
        const results = (fields.find(f => f.name === fieldName)?.options || []).filter((item: any) => {
            const label = typeof item === "string" ? item : item[fields.find(f => f.name === fieldName)?.optionLabel || "label"];
            return label?.toLowerCase().includes(event.query.toLowerCase());
        });
        setAutoValues((old) => ({ ...old, [fieldName]: results }));
    };

    // Checkbox group helpers
    const handleCheckboxGroupChange = (field: FieldConfig, value: any) => {
        let checked = [...(formik.values[field.name] || [])];
        if (checked.includes(value)) {
            checked = checked.filter((v) => v !== value);
        } else {
            checked.push(value);
        }
        formik.setFieldValue(field.name, checked);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid">
                {fields.map((field, idx) => {
                    const isInvalid = !!(formik.touched[field.name] && formik.errors[field.name]);
                    const colClass = field.col || `col-12 md:col-${Math.max(2, (12 / fields.length) | 0)}`;
                    const commonProps = {
                        id: field.name,
                        name: field.name,
                        value: formik.values[field.name],
                        onChange: (e: any) => {
                            if (e.value !== undefined) formik.setFieldValue(field.name, e.value);
                            else if (e.target?.value !== undefined) formik.setFieldValue(field.name, e.target.value);
                            else formik.setFieldValue(field.name, e);
                        },
                        onBlur: formik.handleBlur,
                        className: classNames({"w-full mb-1": true, "p-invalid": isInvalid }),
                        ...field,
                    };

                    // Special rendering for some fields
                    let inputComp;
                    switch (field.type) {
                        case "autocomplete":
                            inputComp = (
                                <AutoComplete
                                    {...commonProps}
                                    suggestions={autoValues[field.name] || []}
                                    completeMethod={(e) => handleAutoComplete(field.name, e)}
                                    field={field.optionLabel}
                                    dropdown
                                />
                            );
                            break;
                        case "calendar":
                            inputComp = <Calendar {...commonProps} />;
                            break;
                        case "cascadeselect":
                            inputComp = (
                                <CascadeSelect
                                    {...commonProps}
                                    options={cascadeOptions}
                                    optionLabel="name"
                                    optionGroupLabel="name"
                                    optionGroupChildren={["states", "cities"]}
                                />
                            );
                            break;
                        case "chips":
                            inputComp = <Chips {...commonProps} />;
                            break;
                        case "colorpicker":
                            inputComp = <ColorPicker {...commonProps} />;
                            break;
                        case "dropdown":
                            inputComp = <Dropdown {...commonProps} options={field.options} optionLabel={field.optionLabel} optionValue={field.optionValue} />;
                            break;
                        case "iconfield":
                            inputComp = (
                                <IconField icon={field.icon || "pi pi-user"}>
                                    <InputText {...commonProps} />
                                </IconField>
                            );
                            break;
                        case "inputmask":
                            inputComp = <InputMask {...commonProps} mask={field.mask} />;
                            break;
                        case "inputswitch":
                            inputComp = <InputSwitch {...commonProps} checked={formik.values[field.name]} />;
                            break;
                        case "inputnumber":
                            inputComp = <InputNumber {...commonProps} />;
                            break;
                        case "inputotp":
                            inputComp = <InputOtp {...commonProps} />;
                            break;
                        case "inputtext":
                            inputComp = <InputText {...commonProps} />;
                            break;
                        case "inputtextarea":
                            inputComp = <InputTextarea {...commonProps} />;
                            break;
                        case "knob":
                            inputComp = <Knob {...commonProps} />;
                            break;
                        case "listbox":
                            inputComp = <ListBox {...commonProps} options={field.options} optionLabel={field.optionLabel} optionValue={field.optionValue} />;
                            break;
                        case "mention":
                            inputComp = (
                                <Mention
                                    {...commonProps}
                                    suggestions={autoValues[field.name] || []}
                                    onSearch={(e) => handleAutoComplete(field.name, { query: e.value })}
                                />
                            );
                            break;
                        case "multiselect":
                            inputComp = <MultiSelect {...commonProps} options={field.options} optionLabel={field.optionLabel} optionValue={field.optionValue} />;
                            break;
                        case "multistate":
                            inputComp = <MultiStateCheckbox {...commonProps} options={field.options} />;
                            break;
                        case "checkbox":
                            inputComp = <Checkbox {...commonProps} checked={formik.values[field.name]} />;
                            break;
                        case "checkboxgroup":
                            inputComp = (
                                <div className="flex flex-wrap gap-2">
                                    {field.options?.map((opt) => (
                                        <div key={opt.value} className="flex align-items-center">
                                            <Checkbox
                                                inputId={`${field.name}_${opt.value}`}
                                                name={field.name}
                                                value={opt.value}
                                                checked={(formik.values[field.name] || []).includes(opt.value)}
                                                onChange={() => handleCheckboxGroupChange(field, opt.value)}
                                            />
                                            <label htmlFor={`${field.name}_${opt.value}`} className="ml-2">{opt.label}</label>
                                        </div>
                                    ))}
                                </div>
                            );
                            break;
                        case "password":
                            inputComp = <Password {...commonProps} feedback={true} />;
                            break;
                        case "radiobutton":
                            inputComp = (
                                <div className="flex flex-wrap gap-2">
                                    {field.options?.map((opt) => (
                                        <div key={opt.value} className="flex align-items-center">
                                            <RadioButton
                                                inputId={`${field.name}_${opt.value}`}
                                                name={field.name}
                                                value={opt.value}
                                                checked={formik.values[field.name] === opt.value}
                                                onChange={() => formik.setFieldValue(field.name, opt.value)}
                                            />
                                            <label htmlFor={`${field.name}_${opt.value}`} className="ml-2">{opt.label}</label>
                                        </div>
                                    ))}
                                </div>
                            );
                            break;
                        case "rating":
                            inputComp = <Rating {...commonProps} />;
                            break;
                        case "selectbutton":
                            inputComp = <SelectButton {...commonProps} options={field.options} optionLabel={field.optionLabel} optionValue={field.optionValue} />;
                            break;
                        case "slider":
                            inputComp = <Slider {...commonProps} />;
                            break;
                        case "treeselect":
                            inputComp = <TreeSelect {...commonProps} options={treeOptions} />;
                            break;
                        case "tristatecheckbox":
                            inputComp = <TriStateCheckbox {...commonProps} />;
                            break;
                        case "togglebutton":
                            inputComp = <ToggleButton {...commonProps} checked={formik.values[field.name]} />;
                            break;
                        default:
                            inputComp = <InputText {...commonProps} />;
                    }

                    return (
                        <div key={field.name} className={colClass}>
                            <label htmlFor={field.name} className="block mb-2">
                                {field.label}
                            </label>
                            {inputComp}
                            {isInvalid && (
                                <small className="p-error block">{formik.errors[field.name]?.toString()}</small>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="flex gap-2 mt-3">
                <Button type="submit" label={submitLabel} />
                <Button type="button" label={resetLabel} severity="secondary" onClick={() => formik.resetForm()} />
            </div>
        </form>
    );
}