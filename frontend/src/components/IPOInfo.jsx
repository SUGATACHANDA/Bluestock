import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { createCompany } from "../api/companyApi";

const IPOInfo = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      company_name: "",
      revenue: "",
      netProfit: "",
      totalAssets: "",
      bookValue: "",
      companyOverview: [{ text: "" }],
      businessDescription: [{ text: "" }],
      objectives: [{ text: "" }],
      riskFactors: [{ text: "" }],
    },
  });

  const companyOverviewFields = useFieldArray({ control, name: "companyOverview" });
  const businessDescriptionFields = useFieldArray({ control, name: "businessDescription" });
  const objectivesFields = useFieldArray({ control, name: "objectives" });
  const riskFactorsFields = useFieldArray({ control, name: "riskFactors" });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("company_name", data.company_name);
      if (data.company_logo?.[0]) formData.append("company_logo", data.company_logo[0]);
      formData.append("revenue", data.revenue);
      formData.append("netProfit", data.netProfit);
      formData.append("totalAssets", data.totalAssets);
      formData.append("bookValue", data.bookValue);
      formData.append("companyOverview", JSON.stringify(data.companyOverview.map((i) => i.text)));
      formData.append("businessDescription", JSON.stringify(data.businessDescription.map((i) => i.text)));
      formData.append("objectives", JSON.stringify(data.objectives.map((i) => i.text)));
      formData.append("riskFactors", JSON.stringify(data.riskFactors.map((i) => i.text)));

      await createCompany(formData);
      alert("Company created successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const renderFieldArray = (fields, name, label) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label className="block text-sm font-medium">{label}</label>
        <button
          type="button"
          onClick={() => fields.append({ text: "" })}
          className="text-xs px-2 py-1 rounded bg-indigo-100 hover:bg-indigo-200"
        >
          + Add
        </button>
      </div>
      {fields.fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <textarea
            {...register(`${name}.${index}.text`)}
            rows={2}
            placeholder={label}
            className="w-full border rounded p-2 text-sm"
          />
          {fields.fields.length > 1 && (
            <button
              type="button"
              onClick={() => fields.remove(index)}
              className="text-xs text-red-500"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Company</h2>

      <input
        {...register("company_name")}
        placeholder="Company Name"
        className="w-full border p-2 rounded text-sm"
        required
      />

      <input
        type="file"
        accept="image/*"
        {...register("company_logo")}
        className="text-sm"
      />

      {renderFieldArray(companyOverviewFields, "companyOverview", "Company Overview")}
      {renderFieldArray(businessDescriptionFields, "businessDescription", "Business Description")}
      {renderFieldArray(objectivesFields, "objectives", "Objectives of Issue")}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input {...register("revenue")} placeholder="Total Revenue" className="border rounded p-2 text-sm" />
        <input {...register("netProfit")} placeholder="Net Profit" className="border rounded p-2 text-sm" />
        <input {...register("totalAssets")} placeholder="Total Assets" className="border rounded p-2 text-sm" />
        <input {...register("bookValue")} placeholder="Book Value" className="border rounded p-2 text-sm" />
      </div>

      {renderFieldArray(riskFactorsFields, "riskFactors", "Risk Factors")}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700"
      >
        {isSubmitting ? "Saving..." : "Create Company"}
      </button>
    </form>
  );
};

export default IPOInfo;
