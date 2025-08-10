// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    // let submissionDates;


    let score;
    let totalScore;
    // let submissionScore;
    let pointPossible;
    let totalPointPossible = 0;
    let temp;
    // let percentage;
    let items;
    let avg;
    const results = [];
    let learnerIds = [];






    // for (const asignment of ag.assignments) {


    // try {


    for (const submission of submissions) {
        // Check if learner ID already exists in our array and type of number
        let exists = false;
        for (const id of learnerIds) {
            if (id === submission.learner_id && typeof id === 'number') {
                exists = true;
                break;
            }
        }
        // Only add if not already in array
        if (!exists) {
            learnerIds.push(submission.learner_id);
        }

        if (typeof submission.learner_id !== 'number') {
            throw new Error(`Invalid data:typeof number expected`);
        }
    }

    for (const learnerId of learnerIds) {


        // get submission only for learnerId included in Assignment program
        const learnerSubmissions = [];
        for (const subs of submissions) {
            if (subs.learner_id === learnerId) {
                learnerSubmissions.push(subs);
            }
        }


        for (const subs of learnerSubmissions) {
            let totalScore = 0;
            let totalPointPossible = 0;
            const assignmentScores = {};

            // get all the assigment data
            let assignment = null;
            for (const assign of ag.assignments) {
                if (assign.id === subs.assignment_id) { //subs.assignment_id === assignment.id
                    assignment = assign;
                    break;
                }
            }

            if (!assignment) {
                console.log(` Assignment ${subs.assignment_id} not found, skipping`);
                continue;
            }


            console.log("Learner IDs found:", learnerIds);
            //    console.log( "totalPoint",totalPointPossible += assignment.points_possible);
            if (course.course_id !== assignment.course_id) {
                throw new Error(` AssignmentGroup ${assignment.course_id} does not belong to its course (mismatching ${course.course_id})`);

            }

            // Validate assignment data
            pointPossible = parseFloat(assignment.points_possible);
            if (isNaN(pointPossible) || pointPossible <= 0) {
                console.warn(`Warning: Invalid points_possible (${assignment.points_possible}) for assignment ${assignment.id}. Skipping assignment.`);
                continue;
            }

            // Parse and validate score
            score = parseFloat(subs.submission.score);
            if (isNaN(score)) {
                console.warn(`Warning: Invalid score (${subs.submission.score}) for learner ${learnersId}, assignment ${assignment.id}. Treating as 0.`);
                score = 0;
            }

            if (assignment) {

                console.log(`  loading... assignment ${assignment.id}: ${assignment.name}`);

                // Calculate the due date
                const dueDate = new Date(assignment.due_at);
                // calculate the subit_at Date
                const submitAt = new Date(subs.submission.submitted_at);

                console.log(` Due: ${assignment.due_at}, Submitted: ${subs.submission.submitted_at}`);
                // get current date to make sure that project are yet due
                const today = new Date();
                //Only assignment that are due
                if (dueDate <= today) {

                    score = subs.submission.score;
                    pointPossible = assignment.points_possible;

                    if (submitAt > dueDate) {

                        const penaltyPoint = pointPossible * 0.10;
                        score -= penaltyPoint;
                        console.log(`Late penalty applied: ${subs.submission.score} - ${penaltyPoint} = ${score}`);
                    }

                    //Make the aggragation of the score
                    totalPointPossible += pointPossible;
                    totalScore += score;

                    // Calculate the percentage
                    const percentage = score / pointPossible;
                    assignmentScores[assignment.id] = percentage.toFixed(3);


                    console.log(`Score: ${score}/${pointPossible} = ${percentage.toFixed(3)}`);
                } else {
                    console.log(`Assignment not due yet (${assignment.due_at})`);
                }
            }

            if (totalPointPossible > 0) {

                // calculate avg
                // 
                avg = totalScore / totalPointPossible;

                // display
                // Check if this learner_id already exists in items array
                // if (!items.find(item => item.id === subs.learner_id)) {
                // avg = totalScore / totalPointPossible;
                const items = {
                    id: learnerId,
                    avg: parseFloat(avg.toFixed(3)),
                    ...assignmentScores,
                };

                results.push(items);

                console.log(`  Final: Total ${totalScore}/${totalPointPossible} = ${avg.toFixed(3)}`);
                console.log(`  Result:`, items);
            } else {
                console.log("nothing found");
            }


        }
        // } catch (err) {
        //     console.error("Error calculating learner averages:", err.message);

        // }
        // }


    }

    return results;

}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

// const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];
// -----------------helper Function---------------
/*
    function currentDate() {
        function getCurrentYear() {
            const today = new Date;
            const year = today.getFullYear();
            return year;
        }
        function getCurrentMonth() {
            const today = new Date;
            const month = today.getMonth() + 1; //get month (0-based index, so i add 1)
            return month;
        }
        function getCurrentDay(year = getCurrentYear()) {
            const today = new Date;
            today.setFullYear(year); // i set the year to 2025
            const day = today.getDate(); //get the day
            return day;
        }
        return console.log(` Date -${getCurrentYear()}-${getCurrentMonth()}-${getCurrentDay()}`);
    }
*/ 