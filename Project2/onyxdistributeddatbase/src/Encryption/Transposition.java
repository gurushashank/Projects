package Encryption;

public class Transposition {

    private int numberOfRows;
    private int numberOfColumns;
    private char[][] twoDMatrix;

    public String generateCipherText(String plaintext, int[] key) {

        String tempString = plaintext;
        String cipherText;
        // Find the number of rows and columns for creating the 2 d matrix
        numberOfColumns = key.length;
        numberOfRows = Helper.numberOfRows(tempString, key);
        // Create an empty matrix - rows * columns
        twoDMatrix = Helper.create2DMatrix(numberOfRows, numberOfColumns);
        // Add the plaintext to the matrix
        twoDMatrix = Helper.addThePlaintextToMatrix(tempString, twoDMatrix, numberOfRows, numberOfColumns);
        // Replace the spaces with % character
        twoDMatrix = Helper.replaceSpacesWithModCharacter(twoDMatrix, numberOfRows, numberOfColumns);
        // Create the cipher text based on the key values
        cipherText = Helper.createCipherText(twoDMatrix, numberOfRows, numberOfColumns, key);
        return cipherText;
    }

    public String decipherCipherText(String ciphertext, int[] key) {

        String plaintext;
        // Find the number of rows and columns
        numberOfColumns = key.length;
        numberOfRows = Helper.numberOfRows(ciphertext, key);
        // Create an empty matrix - rows and columns
        twoDMatrix = Helper.create2DMatrix(numberOfRows, numberOfColumns);
        // Add the cipher to the 2 d matrix
        Helper.addCipherToMatrix(ciphertext, twoDMatrix, numberOfRows, numberOfColumns, key);
        // Decipher the cipher text from the 2 d matrix
        plaintext = Helper.decipherCipherTextFromMatrix(twoDMatrix, numberOfRows, numberOfColumns);
        return plaintext;
    }

}
