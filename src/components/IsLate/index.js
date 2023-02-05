export function getStageDate(idStage, proc, flow) {
  if (idStage === flow.sequences[0].from) {
    return new Date(proc.createdAt);
  } else {
    let currentStage = flow.sequences.find(
      (sequence) => sequence.to === idStage
    );
    if (currentStage) return new Date(currentStage.createdAt);
    else return null;
  }
}

export function isLate(stage, proc, flow) {
  const today = new Date();
  const dayInMilisseconds = 24 * 3600 * 1000;
  const stageDate = getStageDate(stage?.idStage, proc, flow);

  const timeInDays = (today - stageDate) / dayInMilisseconds;
  return timeInDays < 0;
}
