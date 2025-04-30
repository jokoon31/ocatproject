import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const errors = {};
  // const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };

  return (
    // <form onSubmit={handleSubmit((data) => console.log(data))}>
    <Form>

      <h1>Cat Assessment Info</h1>

      <br />

      <h2> Instrument </h2>

      <div>

        <Form.Label>

          Instrument Type:&nbsp;

          {/*
          <Controller
          // name="InstrumentTypeText"
          // control={control}
          // render={({ field }) =>
          // <input type="text" {...field} />}
          />
          */}

          <Form.Control
            type="text"
            name="InstrumentTypeText"
          />

        </Form.Label>
        {errors.InstrumentTypeText && <p> This is a required question </p>}
      </div>

      <br />

      <h2> Cat Details </h2>

      <div>

        <Form.Label>

          Cat Name:&nbsp;

          <Form.Control
            type="text"
          />

        </Form.Label>

        <br /> <br />

        <Form.Label>

          Date of Birth:&nbsp;

          <Form.Control
            type="date"
          />

        </Form.Label>

      </div>

      <br />

      <h2> Questions & Responses </h2>

      <br />

      <ol>
        <li> Previous Contact with the Cat Judicial System </li>

        <br />
        <Form.Group>

          <Form.Check
            value="No (score = 0)"
            type="radio"
            label="No (score = 0)"
          />

          <Form.Check
            value="Yes (score = 1)"
            type="radio"
            label="Yes (score = 1)"
          />

        </Form.Group>

        <br />

        <li> Physical altercations with other cats </li>

        <br />

        <Form.Group>

          <Form.Check
            value="0-3 altercations (score = 0)"
            type="radio"
            label="0-3 altercations (score = 0)"
          />

          <Form.Check
            value="3+ altercations (score = 1)"
            type="radio"
            label="3+ altercations (score = 1"
          />

        </Form.Group>

        <br />

        <li> Physical altercations with owner (scratching, biting, etc.) </li>

        <br />

        <Form.Group>

          <Form.Check
            value="10+ altercations (score = 1)"
            type="radio"
            label="10+ altercations (score = 1)"
          />

          <Form.Check
            value="0-10 altercations (score = 0)"
            type="radio"
            label="0-10 altercations (score = 1)"
          />

        </Form.Group>

        <br />

        <li> Plays well with dogs </li>

        <br />

        <Form.Group>

          <Form.Check
            value="No (score = 1)"
            type="radio"
            label="No (score = 1)"
          />

          <Form.Check
            value="Yes (score = 0)"
            type="radio"
            label="Yes (score = 0)"
          />

        </Form.Group>

        <br />

        <li> Hisses at strangers </li>

        <br />

        <Form.Group>

          <Form.Check
            value="Yes (score = 1)"
            type="radio"
            label="Yes (score = 1)"
          />

          <Form.Check
            value="No (score = 0)"
            type="radio"
            label="No (score = 0)"
          />

        </Form.Group>

      </ol>

      <br />

      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};
