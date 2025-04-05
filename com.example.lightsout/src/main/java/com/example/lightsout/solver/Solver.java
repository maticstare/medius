package com.example.lightsout.solver;

public class Solver {

    private final int n;
    private int[][] grid;
    private int[][] matrix; // Augmented matrix for Gaussian elimination
    private int[] solution;

    public Solver(String board) {
        this.n = (int) Math.sqrt(board.length());
        if (n * n != board.length()) {
            throw new IllegalArgumentException("Board must be a square grid.");
        }
        if (n < 3 || n > 8) {
            throw new IllegalArgumentException("Grid size must be between 3 and 8.");
        }
        if (!board.matches("[01]+")) {
            throw new IllegalArgumentException("Board must contain only 0s and 1s.");
        }
        
        this.grid = new int[n][n];
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                this.grid[i][j] = Character.getNumericValue(board.charAt(i * n + j));
            }
        }
        // Build the augmented matrix
        this.matrix = new int[n * n][n * n + 1];
        buildA();

        this.solution = new int[n * n];
    }
    

    public boolean solve() {
        int size = n * n;
        
        // Forward elimination in GF(2)
        for (int col = 0; col < size; col++) {
            int pivotRow = col;
            while (pivotRow < size && matrix[pivotRow][col] == 0) {
                pivotRow++;
            }
            if (pivotRow == size) continue;
            
            // Swap the pivot row with the current row if necessary
            if (pivotRow != col) {
                int[] temp = matrix[col];
                matrix[col] = matrix[pivotRow];
                matrix[pivotRow] = temp;
            }
            
            // Eliminate all rows below the pivot row
            for (int row = col + 1; row < size; row++) {
                if (matrix[row][col] == 1) {
                    for (int j = 0; j <= size; j++) {
                        matrix[row][j] ^= matrix[col][j];
                    }
                }
            }
        }

        // Back substitution
        for (int i = size - 1; i >= 0; i--) {
            solution[i] = matrix[i][size];
            for (int j = i + 1; j < size; j++) {
                solution[i] ^= (matrix[i][j] & solution[j]);
            }
        }

        // Check if the solution exists (return false if it doesn't)
        for (int i = 0; i < size; i++) {
            if (matrix[i][i] == 0 && matrix[i][size] == 1) {
                return false;
            }
        }

        // Print the solution and return true
        System.out.println("Press these lights to turn all ON:");
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                System.out.print(solution[row * n + col] + " ");
            }
            System.out.println();
        }
        return true;
    }

    private void buildA() {
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                int index = row * n + col;
                this.matrix[index][index] = 1;

                if (row > 0) this.matrix[index][(row - 1) * n + col] = 1;
                if (row < n - 1) this.matrix[index][(row + 1) * n + col] = 1;
                if (col > 0) this.matrix[index][row * n + (col - 1)] = 1;
                if (col < n - 1) this.matrix[index][row * n + (col + 1)] = 1;

                this.matrix[index][n * n] = 1 ^ this.grid[row][col]; // switch all the lights ON
                //this.matrix[index][n * n] = this.grid[row][col]; // switch all the lights OFF
            }
        }
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                sb.append(this.grid[i][j]).append(" ");
            }
            sb.append("\n");
        }
        return sb.toString();
        
    }

    public int[] getSolution() {
        return this.solution;
    }
    





    /* public static void main(String[] args) {
        // Solvable example
        String board = "101010101";
        //1 0 1
        //0 1 0
        //1 0 1
        Solver solver = new Solver(board);
        System.out.println("Solving board: \n" + solver.toString());
        boolean result = solver.solve();
        System.out.println("Solution found: " + result);
        
        System.out.println();


        // Unsolvable example
        board = "1100110000110011";
        //1 1 0 0
        //1 1 0 0
        //0 0 1 1
        //0 0 1 1
        solver = new Solver(board);
        System.out.println("Solving board: \n" + solver.toString());
        result = solver.solve();
        System.out.println("Solution found: " + result);
        
    } */
}



