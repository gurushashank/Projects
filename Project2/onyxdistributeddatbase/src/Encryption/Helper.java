package Encryption;

import java.util.ArrayList;
import java.util.List;

public class Helper {

    public static int numberOfRows(String plaintext, int[] key) {

        double lengthOfPlaintext = plaintext.length();
        double keyLength = key.length;
        double numberOfRows = lengthOfPlaintext/keyLength;
        return (int)Math.ceil(numberOfRows);
    }

    public static char[][] create2DMatrix(int rows, int columns) {

        char[][] twoDMatrix = new char[rows][columns];
        for(int i=0; i<rows; i++) {
            for(int j=0; j<columns; j++) {
                twoDMatrix[i][j] = ' ';
            }
        }
        return twoDMatrix;
    }

    public static char[][] addThePlaintextToMatrix(String plaintext, char[][] twoDMatrix, int rows, int columns) {

        int k = 0;
        int length = plaintext.length();
        List<Character> plaintextArrayList = new ArrayList<>();
        for(int i=0; i< length; i++) {
            plaintextArrayList.add(plaintext.charAt(i));
        }
        for(int i=plaintextArrayList.size()-1; i < rows*columns; i++) {
            plaintextArrayList.add('%');
        }
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                twoDMatrix[i][j] = plaintextArrayList.get(k);
                k++;
            }
        }
        return twoDMatrix;
    }

    public static char[][] replaceSpacesWithModCharacter(char[][] twoDMatrix, int rows, int columns) {

        for(int i=0; i<rows; i++) {
            for(int j=0; j<columns; j++) {
                if(twoDMatrix[i][j] == ' ') {
                    twoDMatrix[i][j] = '%';
                }
            }
        }
        return twoDMatrix;
    }

    public static String createCipherText(char[][] twoDMatrix, int rows, int columns, int[] key) {

        StringBuilder cipherText = new StringBuilder();
        for(int k = 0; k < key.length; k++) {
            for(int i=0; i<rows; i++) {
                for(int j=0; j<columns; j++) {
                    if(j == (key[k] - 1)) {
                        cipherText.append(twoDMatrix[i][j]);
                    }
                }
            }
        }
        return cipherText.toString();
    }

    public static void addCipherToMatrix(String cipherText, char[][] twoDMatrix, int rows, int columns, int[] key) {

        int l = 0;
        for(int k=0; k < key.length; k++) {
            for(int i=0; i<rows; i++) {
                for(int j=0; j<columns; j++) {
                    if(j == (key[k] - 1)) {
                        twoDMatrix[i][j] = cipherText.charAt(l);
                        l++;
                        break;
                    }
                }
            }
        }
    }

    public static String decipherCipherTextFromMatrix(char[][] twoDMatrix, int rows, int columns) {

        // extract the cipher text from the matrix
        StringBuilder plaintext = new StringBuilder();
        for(int i=0; i<rows; i++) {
            for(int j=0; j<columns; j++) {
                if(twoDMatrix[i][j] == '%') {
                    twoDMatrix[i][j] = ' ';
                }
                plaintext.append(twoDMatrix[i][j]);
            }
        }
        // Remove the leading and trailing spaces
        return plaintext.toString().trim();
    }

    public static void main(String[] args) {

        numberOfRows("meet at military house", new int[]{5,3,4,2,1});
    }
}
