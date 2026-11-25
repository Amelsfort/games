/* =====================================================================
   MATH SETTINGS for math.html

   For now the game practises division the way it's taught at school:
   first a hint list ("hulplijst": 100 × 5 = 500, 80 × 5 = 400, …), then
   keep subtracting the biggest row that fits, and finish with a
   times-table fact. 935 : 5 → 935 − 500 = 435 → 435 − 400 = 35 →
   35 : 5 = 7, so the answer is 1 8 7.

   On the start screen she picks which divisors and which number ranges
   to practise (any combination). Every sum takes one of the chosen
   divisors and a number from one of the chosen ranges.

   - divisors:   the divisors on the start screen.
   - ranges:     the number ranges on the start screen, [from, to].
   - chosen:     what's selected the very first time (after that the game
                 remembers her own choice on this device).
   - remainders: false = only sums that divide exactly,
                 true  = also sums with something left over ("rest").
   - count:      how many sums per game.
   - hints:      the hint list is made automatically: every row
                 "digit × 1, 10, 100, …" that fits the biggest number
                 (for 5 and up to 1000: 200, 100, 90 … 10, 9 … 1).
                 To use your own list for a divisor, add it here, e.g.
                 hints: { 5: [200, 100, 50, 20, 10, 5, 2, 1] },
   ===================================================================== */

const MATH = {
  division: {
    divisors: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    ranges: [[10, 100], [100, 1000], [1000, 10000]],
    chosen: { divisors: [5], ranges: [[100, 1000]] },
    remainders: false,
    count: 10,
    hints: {},
  },
};
