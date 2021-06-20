import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../../controls/Controls";
import { useForm, Form } from "../../../controls/useForm";
import Select from "@material-ui/core/Select";
import { store } from "../../../../redux-store/store";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const initialFValues = {
  id: 0,
  name: "",
  firstName: "",
  priorityName: "",
  lastName: "",
  ticketDescription: "",
  priorityId: "",
  email: "",
  dateCreated: new Date(),
};

export default function TicketForm(props) {
  const { recordForEdit, priorities, setOpenPopup } = props;
  console.log(priorities);
  const validate = (fieldValues = values) => {};

  const { values, setValues, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      id: values.id,
      priorityId: values.priorityId,
    };
    console.log(data);
    store.dispatch({ type: "UPDATE_TICKET", payload: data });
    setOpenPopup(false);
  };

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Ticket Type"
            value={values.name || ""}
            readOnly={true}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="First Name"
            name="firstName"
            value={values.firstName || ""}
            readOnly={true}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Last Name"
            name="lastName"
            value={values.lastName || ""}
            readOnly={true}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Email"
            name="email"
            readOnly={true}
            value={values.email || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
       
          <Controls.Select
            name="priorityId"
            label="Priorities"
            value={values.priorityId || ""}
            onChange={handleInputChange}
            options={priorities}
          />
          <div style={{marginLeft:'10px'}}>
            <TextareaAutosize
              rowsMax={4}
              aria-label="maximum height"
              placeholder="Ticket Description"
              style={{ width: "100%" ,minHeight:"90px" }}
              defaultValue={values.ticketDescription || ""}
            />
          </div>

          <div>
            <Controls.Button type="submit" text="Submit" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
