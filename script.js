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

    let ListAsignment;
    let status = true;
    let score;
    let totalScore = 0;
    let submissionScore;
    let pointPossible;
    let totalPointPossible = 0;
    let temp;
    let exist;
    let items = [];
    let avg;

    // return the dates of submission

    for (const subs of submissions) {

        for (const asign of ag.assignments) {

            // if (subs.assignment_id === assignment.id ){
            //     console.log("Total score",totalScore += subs.submission.score);
            //    console.log( "totalPoint",totalPointPossible += assignment.points_possible);
            if (subs.assignment_id === asign.id) {
                temp = subs.learner_id;
                score = subs.submission.score;
                pointPossible = asign.points_possible;
                // Check if this learner_id already exists in items array

                if (!items.find(item => item.id === subs.learner_id)) {
                    items.push({ id: subs.learner_id });
                }


                console.log(`temp-value ${temp}`);
                //    submissionScore= [ subs];


                // ListAsignment = console.log(asign.due_at);
                if (asign.due_at !== '3156-11-15') {

                    ListAsignment = "2023-01-07";
                    temp = ListAsignment.slice(0, 4);
                    // temp= ListAsignment.split("-")[0];

                    if (asign.due_at !== '3156-11-15') {
                        status = true;
                        ListAsignment = "2023-01-07";
                        // temp = ListAsignment.slice(6, 7);
                        // temp= ListAsignment.split("-")[0];
                        //if due_at is greater than submitted_at penalty(10% or Possible point) will deduct the score
                        if (asign.due_at.slice(6, 7) > subs.submission.submitted_at.slice(6, 7) && asign.due_at.slice(8, 10) > subs.submission.submitted_at.slice(8, 10)) {
                            penaltyPoint = pointPossible - 0.10;
                            totalPointPossible -= penaltyPoint;
                        } else {
                        }
                    } else {
                        // console.log(`----${ListAsignment}`);
                        status = false;
                    }


                } else {

                    // console.log(`----${ListAsignment}`);
                    status = false;
                }
            }

        }
        //  result =console.log(`----temp ${submissionScore}`);
        // return console.log(`----temp ${temp}`);
        // return  console.log(status);
    }

    console.log(" ToTalscore", totalScore += score);
    console.log("ToTalPointPossible", totalPointPossible += pointPossible);
    console.log("---sub", submissionScore);
    // temp = console.log("---asign",asign);
    console.log(items);
    //  submittedAt();
    // filterAssigmentsDue();
    //   currentDate();
    // return console.log(`----temp ${submissionScore}`);


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