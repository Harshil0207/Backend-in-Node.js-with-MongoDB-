const Student = require("../model/student");
const ErrorHandler = require("../middlwere/errorHandler");
const { StatusCodes } = require("http-status-codes");
const FileStoreToFirabse = require("../middlwere/multerUploadFile");
const sendEmail = require("../util/emailservice");
const path = require("path");


exports.createStudent = async (req, res, next) => {
  try {
    const { name, age, status, email, skills, address, marks } = req.body;
    const profile = req.file;

    if (!name || !age || !status || !skills || !email  || !address || !marks) {
      return next(
        new ErrorHandler("All are requried", StatusCodes.BAD_REQUEST)
      );
    }

    const images = await FileStoreToFirabse.uploadFileToFirebase(profile,"student","profile");

    await sendEmail({
      to: email,
      subject: "Welcome to Students Crud",
      html: `
              <h1>Welcome ${name}</h1>
              <img src=${images} width="200px" height="300px"/>
            `,
      attachments: [
        {
          filename: "doc.docx",
          path: path.join(__dirname, "..", "doc.docx"),
        },
      ],
    });

    const student = await Student.create({
      name: name,
      age: age,
      status: status,
      email: email,
      skil: skills,
      address: address,
      marks: marks,
      profile: images,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "student register",
      student: student,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};
  
exports.getStudent = async (req, res, next) => {
  try {
    const student = await Student.find();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "student fetch succssfully",
      student: student,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    const { userId } = req.params;

    //const {name,status} = req.query
    //const students = await Student.find({ name: { $regex:name , $options: "i" },  status: status });

    const students = await Student.findById(userId);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "students fetch succssfully",
      student: students,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const students = await Student.findById(userId);
    if (!students) {
      return next(
        new ErrorHandler("Student not found", StatusCodes.BAD_REQUEST)
      );
    }

    const student = await Student.findByIdAndDelete(userId);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "students delete succssfully",
      student: student,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    //const {name,status} = req.query
    const { userId } = req.params;

    //const students = await Student.find({ name: { $regex:name , $options: "i" },  status: status });

    const students = await Student.findById(userId);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "students fetch succssfully",
      student: students,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const students = await Student.findById(userId);
    if (!students) {
      return next(
        new ErrorHandler("Student not found", StatusCodes.BAD_REQUEST)
      );
    }

    await FileStoreToFirabse.deleteFileFromFirebase(students.profile);

    const student = await Student.findByIdAndDelete(userId);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "students delete succssfully",
      student: student,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.getEditStudent = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const students = await Student.findById(userId);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "students Edit fetch succssfully",
      student: students,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.UpdateStudent = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, age, status, skills, address, email, marks } = req.body;
    const profile = req.file;

    const students = await Student.findById(userId);
    if (!students) {
      return next(new ErrorHandler("Student not found"));
    }

    students.name = name;
    students.status = status;
    students.age = age;
    students.skil = skills;
    students.address = address;
    students.email = email;
    students.marks = marks;

    if (profile) {
      if (students.profile) {
        await FileStoreToFirabse.deleteFileFromFirebase(students.profile);
      }

      const newProfile = await FileStoreToFirabse.uploadFileToFirebase(
        profile,
        "student",
        "profile"
      );

      students.profile = newProfile;
    }

    const UpdateStudent = await students.save();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "students update succssfully",
      student: UpdateStudent,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};
