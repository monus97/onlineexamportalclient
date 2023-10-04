import { CREATE_SKILL, GET_ALL_QUESTIONS_BY_SKILL, GET_SKILL, GET_SKILL_ID } from "../actionTypes";

export const generateSkill = (data) => {
  return {
 type: CREATE_SKILL,
    payload: data,
  };
};
export const getSkills = () => {
  return {
 type: GET_SKILL
  };
};
export const getQuestionsBySkill = (id) => {
  return {
    type: GET_ALL_QUESTIONS_BY_SKILL,
    payload : id
  };
};
export const getSkillID = (id) => {
  return {
    type: GET_SKILL_ID,
    payload: id,
  };
};
