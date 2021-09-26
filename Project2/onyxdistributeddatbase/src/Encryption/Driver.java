package Encryption;

public class Driver {

    public static void main(String[] args) {

        Transposition transpositionMatrix = new Transposition();
        int[] key = {3,4,2,1,5};
        String ciphertext;
        String plaintext;
        String inputPlaintext = "Halifax@2901";

        // Calculate the cipher text
        ciphertext = transpositionMatrix.generateCipherText(inputPlaintext, key);
        System.out.println("Ciphertext is: " + ciphertext);

        // Calculate the plaintext
        plaintext = transpositionMatrix.decipherCipherText(ciphertext, key);
        System.out.println("Plaintext is: " + plaintext);
    }
}
