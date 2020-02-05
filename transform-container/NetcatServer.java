
import java.io.*;
import static java.lang.System.exit;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * Modified server code for Dexter demo
 */
public class NetcatServer
{

  private static Transform dexterTransformer;
  private static Scanner scanner;
  private static Socket connectionSocket;
  private static InputStream serverInput;
  private static OutputStream serverOuput;
  private static PrintWriter serverWriter;
  private static int PORT = 9991;

  public static void main(String[] args)
  {
    initializeServer();
  }

  public static void initializeServer()
  {
    try (ServerSocket serverSocket = new ServerSocket(PORT)) {
      connectionSocket = serverSocket.accept();

      serverInput = connectionSocket.getInputStream();
      serverOuput = connectionSocket.getOutputStream();

      scanner = new Scanner(serverInput, "UTF-8");
      serverWriter = new PrintWriter(new OutputStreamWriter(serverOuput, "UTF-8"), true);

      dexterTransformer = new Transform();

      serverWriter.println("Server Initialized. Enter Stop to terminate.");
      serverWriter.println("Please provide " + dexterTransformer.numInputParameters + " numeric arguments delimited with a space.");

      while (scanner.hasNextLine()) {
        readServerInput();
      }
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }

  private static void readServerInput()
  {
    String line = scanner.nextLine();

    if (line.toLowerCase().trim().equals("stop")) {
      serverWriter.println("Ending server session.");
      exit(0);
    }
    
    String[] values = line.split(" ");
    double[] output = transformInput(values);
    
    //Todo - netcat in and send it to the party. For now, just log.
    for (double convertedValue : output) {
      serverWriter.println(convertedValue);
    }
  }
  
  private static double[] transformInput(String[] values){
    ArrayList<Double> parsedValues = new ArrayList<Double>();
    double[] output = new double[dexterTransformer.numOutputParameters];

    if (values.length == dexterTransformer.numInputParameters) {
      for (String value : values) {
        parsedValues.add(Double.parseDouble(value));
      }

      dexterTransformer.convert(parsedValues.get(0).doubleValue(),
        parsedValues.get(1).doubleValue(), parsedValues.get(2).doubleValue(), output);
    }
    
    return output;
  }
}
