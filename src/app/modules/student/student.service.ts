import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('user already exists');
  }

  const result = await Student.create(studentData); //built in static method

  // const student = new Student(studentData); // create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('user already exists!');
  // }

  // const result = await student.save(); // built in instance method

  return result;
};

const getAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
