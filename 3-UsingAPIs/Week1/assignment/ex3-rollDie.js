/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/3-UsingAPIs/Week1#exercise-3-roll-a-die

- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollDie()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDie()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/
export function rollDie() {

  return new Promise((resolve, reject) => {
    const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
    console.log(`Die scheduled for ${randomRollsToDo} rolls...`);

    const rollOnce = (roll) => {
      // Compute a random die value for the current roll
      const value = Math.floor(Math.random() * 6) + 1;
      console.log(`Die value is now: ${value}`);

      // Use callback to notify that the die rolled off the table after 6 rolls
      if (roll > 6) {
        reject(new Error('Oops... Die rolled off the table.'));
      }

      // Use callback to communicate the final die value once finished rolling
      if (roll === randomRollsToDo) {
        resolve(value);
      }
      if (roll < randomRollsToDo) {
        setTimeout(() => rollOnce(roll + 1), 500);
      }
    };
    rollOnce(1);
  })
}

async function main() {
  await rollDie()
    .then((value) => console.log(`Success! Die settled on ${value}.`))
    .catch((error) => console.log(error));
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}

// In the callback version, the problem occurred because the function could trigger both an “error”
// (after more than 6 rolls) and a “success” (when it reached randomRollsToDo),
// since the callback was simply invoked multiple times.
//
// Promises follow a different rule: a promise can be settled
// (resolved or rejected) only once. Any subsequent calls to resolve/reject
// are ignored by the specification. Therefore, even if we keep “rolling”
// the die and logging values after a reject, the promise won’t complete
// a second time—there’s no “double” result. In the code above, this is
// additionally safeguarded by a settled flag to avoid attempting to call resolve/reject
