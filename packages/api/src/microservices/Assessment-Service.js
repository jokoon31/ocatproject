const { Assessment } = require(`../database/models`);

function calculateScore(assessment) {
  let score = null;

  if (assessment.previousContact === `Yes`) { score += 1; }
  if (assessment.altercationsCats === `3+ altercations`) { score += 1; }
  if (assessment.altercationsOwner === `10+ altercations`) { score += 1; }
  if (assessment.playsDogs === `No`) { score += 1; }
  if (assessment.hissesStrangers === `Yes`) { score += 1; }

  return score;
}

function findRiskLevel(score) {
  if (score === 0 || score === 1) { return `Low`; }
  if (score === 2 || score === 3) { return `Medium`; }
  if (score === 4 || score === 5) { return `High`; }
}

exports.submit = async (assessment) => {

  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database

  try {
    console.log(`assessment`, assessment);

    const score = calculateScore(assessment);
    const riskLevel = findRiskLevel(score);

    const result = await Assessment.create({
      altercationsCats: assessment.altercationsCats,
      altercationsOwner: assessment.altercationsOwner,
      catDateOfBirth: assessment.catDateOfBirth,
      catName: assessment.catName,
      hissesStrangers: assessment.hissesStrangers,
      instrumentType: Number(assessment.instrumentType),
      playsDogs: assessment.playsDogs,
      previousContact: assessment.previousContact,
      riskLevel,
      score,
    });
    return result;
  } catch (err) {
    console.log(err);
  }

};

exports.getList = async () => {

  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database

  try {
    const assessments = await Assessment.findAll();
    return assessments.map(a => a.get({ plain: true }));
  } catch (err) {
    console.log(err);
  }

};
