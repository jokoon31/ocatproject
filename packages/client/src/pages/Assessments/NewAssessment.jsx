import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      altercationsCats: ``,
      altercationsOwner: ``,
      catDateOfBirth: ``,
      catName: ``,
      hissesStrangers: ``,
      instrumentType: ``,
      playsDogs: ``,
      previousContact: ``,
      riskLevel: ``,
      score: ``,
    },
  });

  const [ score, setScore ] = useState(0);

  const previousContact = watch(`previousContact`);
  const altercationsCats = watch(`altercationsCats`);
  const altercationsOwner = watch(`altercationsOwner`);
  const playsDogs = watch(`playsDogs`);
  const hissesStrangers = watch(`hissesStrangers`);

  useEffect(() => {
    const calcScore = () => {
      let currentScore = 0;

      if (previousContact === `Yes`) { currentScore += 1; }
      if (altercationsCats === `3+ altercations`) { currentScore += 1; }
      if (altercationsOwner === `10+ altercations`) { currentScore += 1; }
      if (playsDogs === `No`) { currentScore += 1; }
      if (hissesStrangers === `Yes`) { currentScore += 1; }

      return currentScore;
    };

    const liveScore = calcScore();
    setScore(liveScore);
  }, [ previousContact, altercationsCats, altercationsOwner, playsDogs, hissesStrangers ]);

  const onSubmit = async (data) => {
    console.log(data);
    await AssessmentService.submit(data);
    setScore(Response.score);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <h1>Cat Assessment Info</h1>

      <h5>Risk Score: {score} </h5>

      <div className="form-group">

        <h2> Instrument </h2>

        <div className="form-check">

          Instrument Type:

          <Controller
            control={control}
            name="instrumentType"
            render={({ field }) =>
              <input
                className="form-control"
                type="text"
                {...field}
              />}
          />

        </div>

      </div>

      <div className="form-group">

        <h2> Cat Details </h2>

        <div className="form-check">

          Cat Name:

          <Controller
            control={control}
            name="catName"
            render={({ field }) =>
              <input
                className="form-control"
                type="text"
                {...field}
              />}
          />

        </div>

        <div className="form-check">

          Date of Birth:

          <Controller
            control={control}
            name="catDateOfBirth"
            render={({ field }) =>
              <input
                className="form-control"
                type="date"
                {...field}
              />}
          />

        </div>

      </div>

      <h2> Questions & Responses </h2>

      <ol>

        <li> Previous Contact with the Cat Judicial System </li>

        <Controller
          control={control}
          name="previousContact"
          render={({ field }) =>
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="No (score = 0)"
                  checked={field.value === `No`}
                  onChange={() => field.onChange(`No`)}
                />
                No (score = 0)
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Yes"
                  checked={field.value === `Yes`}
                  onChange={() => field.onChange(`Yes`)}
                />
                Yes (score = 1)
              </div>
            </>}
        />

        <li> Physical altercations with other cats </li>

        <Controller
          control={control}
          name="altercationsCats"
          render={({ field }) =>
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="0-3 altercations (score = 0)"
                  checked={field.value === `0-3 altercations`}
                  onChange={() => field.onChange(`0-3 altercations`)}
                />
                0-3 altercations (score = 0)
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="3+ altercations (score = 1)"
                  checked={field.value === `3+ altercations`}
                  onChange={() => field.onChange(`3+ altercations`)}
                />
                3+ altercations (score = 1)
              </div>
            </>}
        />

        <li> Physical altercations with owner (scratching, biting, etc.) </li>

        <Controller
          control={control}
          name="altercationsOwner"
          render={({ field }) =>
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="0-10 altercations (score = 0)"
                  checked={field.value === `0-10 altercations`}
                  onChange={() => field.onChange(`0-10 altercations`)}
                />
                0-10 altercations (score = 0)
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="10+ altercations (score = 1)"
                  checked={field.value === `10+ altercations`}
                  onChange={() => field.onChange(`10+ altercations`)}
                />
                10+ altercations (score = 1)
              </div>
            </>}
        />

        <li> Plays well with dogs </li>

        <Controller
          control={control}
          name="playsDogs"
          render={({ field }) =>
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="No (score = 1)"
                  checked={field.value === `No`}
                  onChange={() => field.onChange(`No`)}
                />
                No (score = 1)
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Yes (score = 0)"
                  checked={field.value === `Yes`}
                  onChange={() => field.onChange(`Yes`)}
                />
                Yes (score = 0)
              </div>
            </>}
        />

        <li> Hisses at strangers </li>

        <Controller
          control={control}
          name="hissesStrangers"
          render={({ field }) =>
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="No (score = 0)"
                  checked={field.value === `No`}
                  onChange={() => field.onChange(`No`)}
                />
                No (score = 0)
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Yes (score = 1)"
                  checked={field.value === `Yes`}
                  onChange={() => field.onChange(`Yes`)}
                />
                Yes (score = 1)
              </div>
            </>}
        />
      </ol>

      <div className="form-group">

        <div className="form-check">

          <button className="btn btn-primary" type="submit">
            Submit
          </button>

        </div>

      </div>

    </form>
  );
};
