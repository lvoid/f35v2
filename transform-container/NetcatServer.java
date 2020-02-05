import java.io.*;
import static java.lang.System.exit;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Scanner;

/**
* Modified server code for Dexter demo
*/
public class NetcatServer {
    public static void main(String[] args) {
        initializeServer();
    }

    public static void initializeServer() {
        try(ServerSocket serverSocket = new ServerSocket(9991)) {
            Socket connectionSocket = serverSocket.accept();

            InputStream inputToServer = connectionSocket.getInputStream();
            OutputStream outputFromServer = connectionSocket.getOutputStream();

            Scanner scanner = new Scanner(inputToServer, "UTF-8");
            PrintWriter serverPrintOut = new PrintWriter(new OutputStreamWriter(outputFromServer, "UTF-8"), true);
            
            Transform dexterTransformer = new Transform();

            serverPrintOut.println("Server Initialized. Enter Stop to terminate.");
            serverPrintOut.println("Please provide " + dexterTransformer.numInputParameters + " numeric arguments delimited with a space.");
            
            while(scanner.hasNextLine()) {
                String line = scanner.nextLine();
                
                String[] values = line.split(" ");
                ArrayList<Double> parsedValues = new ArrayList<Double>();
                double[] output = new double[dexterTransformer.numOutputParameters];
                
                if(values.length == dexterTransformer.numInputParameters){
                  for(String value: values){
                    parsedValues.add(Double.parseDouble(value));
                  }
                  
                  dexterTransformer.convert(parsedValues.get(0).doubleValue(), 
                    parsedValues.get(1).doubleValue(),parsedValues.get(2).doubleValue(), output);
                  
                  for(double convertedValue: output){
                    serverPrintOut.println(convertedValue);
                  }
                }
                

                if(line.toLowerCase().trim().equals("stop")) {
                    exit(0);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}