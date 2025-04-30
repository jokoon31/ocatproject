import React from 'react';
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
    // <form onSubmit={handleSubmit(onSubmit)}>
    <form>

      <h1>Cat Assessment Info</h1>

      <div className="form-group">

        <h2> Instrument </h2>

        <div>

          <label>

            Instrument Type:&nbsp;

            {/*
          <Controller
          // control={control}
          // name="InstrumentTypeText"
          // render={({ field }) =>
          // <input type="text" {...field} />}
          />
          */}

            <input className="form-control"
              type="text"
              name="InstrumentTypeText"
            />

          </label>
          {errors.InstrumentTypeText && <p> This is a required question </p>}
        </div>

      </div>

      <div className="form-group">

        <h2> Cat Details </h2>

        <div>

          <label>

            Cat Name:&nbsp;

            <input className="form-control"
              type="text"
              name="CatDetails"
            />

          </label>

        </div>

        <div className="form-group">

          <label>

            Date of Birth:&nbsp;

            <input className="form-control"
              type="date"
              name="CatDetails"
            />

          </label>

        </div>

      </div>

      <h2> Questions & Responses </h2>

      <ol>

        <div className="form-group">

          <li> Previous Contact with the Cat Judicial System </li>

          <label className="form-control">

            <input
              name="PreviousContact"
              value="No (score = 0)"
              type="radio"
              label="No (score = 0)"
            />

            &nbsp;No (score = 0)

          </label>

          <label className="form-control control-label">

            <input
              name="PreviousContact"
              value="Yes (score = 1)"
              type="radio"
              label="Yes (score = 1)"
            />

            &nbsp;Yes (score = 1)

          </label>

          <li> Physical altercations with other cats </li>

          <label className="form-control control-label">

            <input
              name="AltercationsWithCats"
              value="0-3 altercations (score = 0)"
              type="radio"
              label="0-3 altercations (score = 0)"
            />

            &nbsp;0-3 altercations (score = 0)

          </label>

          <label className="form-control">

            <input
              name="AltercationsWithCats"
              value="3+ altercations (score = 1)"
              type="radio"
              label="3+ altercations (score = 1)"
            />

            &nbsp;3+ altercations (score = 1)

          </label>

          <li> Physical altercations with owner (scratching, biting, etc.) </li>

          <label className="form-control">

            <input
              name="AltercationsWithOwner"
              value="10+ altercations (score = 1)"
              type="radio"
              label="10+ altercations (score = 1)"
            />

            &nbsp;10+ altercations (score = 1)

          </label>

          <label className="form-control">

            <input
              name="AltercationsWithOwner"
              value="0-10 altercations (score = 0)"
              type="radio"
              label="0-10 altercations (score = 1)"
            />

            &nbsp;0-10 altercations (score = 0)

          </label>

          <li> Plays well with dogs </li>

          <label className="form-control">

            <input
              name="PlaysWithDogs"
              value="No (score = 1)"
              type="radio"
              label="No (score = 1)"
            />

            &nbsp;No (score = 1)

          </label>

          <label className="form-control">

            <input
              name="PlaysWithDogs"
              value="Yes (score = 0)"
              type="radio"
              label="Yes (score = 0)"
            />

            &nbsp;Yes (score = 0)

          </label>

          <li> Hisses at strangers </li>

          <label className="form-control">

            <input
              name="HissesAtStrangers"
              value="Yes (score = 1)"
              type="radio"
              label="Yes (score = 1)"
            />

            &nbsp;Yes (score = 1)

          </label>

          <label className="form-control">

            <input
              name="HissesAtStrangers"
              value="No (score = 0)"
              type="radio"
              label="No (score = 0)"
            />

            &nbsp;No (score = 0)

          </label>

        </div>
      </ol>

      <button btn="primary" type="submit">Submit</button>
    </form >
  );
};
