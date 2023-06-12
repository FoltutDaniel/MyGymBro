export const interceptConstants = {
getWorkouts:{
    method: 'GET',
    path: `**/workout/get-all/**`,
    alias: 'getWorkouts',
    waitAlias: '@getWorkouts',
},
getExercises:{
    method: 'GET',
    path: `**/exercise/getAll`,
    alias: 'getExercises',
    waitAlias: '@getExercises',
},
addExercises:{
    method: 'PUT',
    path: `**/workout/add-exercise/**`,
    alias: 'addExercises',
    waitAlias: '@addExercises',
},

httpsSuccess: 200,
}