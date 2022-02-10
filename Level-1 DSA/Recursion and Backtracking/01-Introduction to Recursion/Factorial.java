import java.io.*;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
        Scanner scn = new Scanner(System.in);
        int n = scn.nextInt();
        int fact = factorial(n);
        System.out.println(fact);
    }

    public static int factorial(int n){
        if(n==0 || n==1) return 1;

        int factn1 = factorial(n-1);
        int factn = n * factn1;
        return factn;
    }

}