import { useForm } from "react-hook-form";

const ParametersForm = (props) => {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const defaultValues = {
    alpha: 0.3,
    beta: 0.7,
    evaporation: 0.4,
    iterations: 20,
    ants: 5,
    capacity: 150,
  };

  const handleClickSetDefault = () => {
    setValue("alpha", defaultValues.alpha);
    setValue("beta", defaultValues.beta);
    setValue("evaporation", defaultValues.evaporation);
    setValue("iterations", defaultValues.iterations);
    setValue("ants", defaultValues.ants);
    setValue("capacity", defaultValues.capacity);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="container-fluid p-3 border shadow needs-validation"
    >
      <div className="mb-3 has-validation">
        <label htmlFor="formFile" className="form-label">
          Select the graph file
        </label>
        <input
          className={`form-control ${errors.file ? "is-invalid" : ""}`}
          type="file"
          id="formFile"
          aria-describedby="fileHelp fileValidate"
          {...register("file", { required: true })}
        />
        <div id="fileValidate" className="invalid-feedback">
          Upload a graph in a JSON format
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Path factors</label>
        <div className="row">
          <div className="col">
            <div className="input-group has-validation">
              <span className="input-group-text" id="alphaSpan">
                Alpha
              </span>
              <input
                type="number"
                className={`form-control form-control-sm ${
                  errors.alpha ? "is-invalid" : ""
                }`}
                id="alpha"
                aria-describedby="alphaSpan alphaValidate"
                step="0.01"
                {...register("alpha", { required: true, min: 0.0, max: 1.0 })}
              />
              <div id="alphaValidate" className="invalid-feedback">
                {errors.alpha?.type == "min" && "The value must be positive"}
                {errors.alpha?.type == "max" && "The value must less than 1.0"}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="input-group has-validation">
              <span className="input-group-text" id="betaSpan">
                Beta
              </span>
              <input
                type="number"
                className={`form-control form-control-sm ${
                  errors.beta ? "is-invalid" : ""
                }`}
                id="beta"
                aria-describedby="betaSpan betaValidate"
                step="0.01"
                {...register("beta", { required: true, min: 0.0, max: 1.0 })}
              />
              <div id="betaValidate" className="invalid-feedback">
                {errors.beta?.type == "min" && "The value must be positive"}
                {errors.beta?.type == "max" && "The value must less than 1.0"}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="input-group has-validation">
              <span className="input-group-text" id="evaporationSpan">
                Evaporation
              </span>
              <input
                type="number"
                className={`form-control form-control-sm ${
                  errors.evaporation ? "is-invalid" : ""
                }`}
                id="evaporation"
                aria-describedby="evaporationSpan evaporationValidate"
                step="0.01"
                {...register("evaporation", {
                  required: true,
                  min: 0.0,
                  max: 1.0,
                })}
              />
              <div id="evaporationValidate" className="invalid-feedback">
                {errors.evaporation?.type == "min" &&
                  "The value must be positive"}
                {errors.evaporation?.type == "max" &&
                  "The value must less than 1.0"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Colony factors</label>
        <div className="row">
          <div className="col">
            <div className="input-group has-validation">
              <span className="input-group-text" id="iterationsSpan">
                Iterations
              </span>
              <input
                type="number"
                className={`form-control form-control-sm${
                  errors.iterations ? "is-invalid" : ""
                }`}
                id="iterations"
                aria-describedby="iterationsSpan iterationsValidate"
                step="10"
                {...register("iterations", {
                  required: true,
                  min: 10,
                  max: 500,
                })}
              />
              <div id="iterationsValidate" className="invalid-feedback">
                {errors.iterations?.type == "min" &&
                  "The value must be greater than 10"}
                {errors.iterations?.type == "max" &&
                  "The value must less than 500"}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="input-group has-validation">
              <span className="input-group-text" id="antsSpan">
                Ants
              </span>
              <input
                type="number"
                className={`form-control form-control-sm ${
                  errors.ants ? "is-invalid" : ""
                }`}
                id="ants"
                aria-describedby="antsSpan antsValidate"
                step="10"
                {...register("ants", {
                  required: true,
                  min: 1,
                  max: 200,
                })}
              />
              <div id="antsValidate" className="invalid-feedback">
                {errors.ants?.type == "min" &&
                  "The value must be greater than 1"}
                {errors.ants?.type == "max" && "The value must less than 200"}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="input-group has-validation">
              <span className="input-group-text" id="capacitySpan">
                Capacity
              </span>
              <input
                type="number"
                className={`form-control form-control-sm ${
                  errors.capacity ? "is-invalid" : ""
                }`}
                id="capacity"
                aria-describedby="capacitySpan capacityValidate"
                step="10"
                {...register("capacity", {
                  required: true,
                  min: 1,
                  max: 200,
                })}
              />
              <div id="capacityValidate" className="invalid-feedback">
                {errors.capacity?.type == "min" &&
                  "The value must be greater than 1"}
                {errors.capacity?.type == "max" &&
                  "The value must less than 200"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row justify-content-end">
          <div className="col-4 d-flex justify-content-end">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClickSetDefault}
              >
                Set default
              </button>
            </div>
          </div>
          <div className="col-xxl-2 col-lg-1 d-flex justify-content-end">
            <div>
              <button type="submit" className="btn btn-primary">
                Run
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ParametersForm;
