
import java.io.*;
import static java.lang.System.exit;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Modified server code for Dexter demo
 */
public class NetcatServer {

  private static Transform dexterTransformer;
  private static Scanner scanner;
  private static Socket connectionSocket;
  private static InputStream serverInput;
  private static OutputStream serverOuput;
  private static PrintWriter serverWriter;
  private static final int PORT = 9991;

  public static void main(String[] args) {
    initializeServer();
  }

  public static void initializeServer() {
    try (ServerSocket serverSocket = new ServerSocket(PORT)) {
      connectionSocket = serverSocket.accept();

      serverInput = connectionSocket.getInputStream();
      serverOuput = connectionSocket.getOutputStream();

      scanner = new Scanner(serverInput, "UTF-8");
      serverWriter = new PrintWriter(new OutputStreamWriter(serverOuput, "UTF-8"), true);

      dexterTransformer = new Transform();

      serverWriter.println("Server Initialized. Enter Stop to terminate.");
      serverWriter.println(
          "Please provide " + dexterTransformer.numInputParameters + " numeric arguments delimited with a space.");

      while (scanner.hasNextLine()) {
        double[] output = readServerInput();
        sendToReadContainer(output);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  private static double[] readServerInput() {
    String line = scanner.nextLine();

    if (line.toLowerCase().trim().equals("stop")) {
      serverWriter.println("Ending server session.");
      exit(0);
    }

    String[] values = line.split(" ");
    double[] output = transformInput(values);

    // Todo - netcat in and send it to the party. For now, just log.
    for (double convertedValue : output) {
      serverWriter.println(convertedValue);
    }

    return output;
  }

  private static double[] transformInput(String[] values) {
    ArrayList<Double> parsedValues = new ArrayList<>();
    double[] output = new double[dexterTransformer.numOutputParameters];

    if (values.length == dexterTransformer.numInputParameters) {
      for (String value : values) {
        parsedValues.add(Double.parseDouble(value));
      }

      dexterTransformer.convert(parsedValues.get(0), parsedValues.get(1), parsedValues.get(2), output);
    }

    return output;
  }

  private static void sendToReadContainer(double[] output) {
    serverWriter.println("Transform complete. Executing transfer to linked node.");

    String outputLine = output.toString();
    boolean isWindows = System.getProperty("os.name").toLowerCase().startsWith("windows");

    try {
      Process process;
      String[] commange = { "sh", "/usr/app/SendNetcatMessage.bat" };
      if (isWindows) {
        // I don't think we're going to get far if this shows up as windows.
        serverWriter.println("Cannot use netcat with Windows. Please change the containers OS and try again.");
        return;
      } else {
        process = Runtime.getRuntime().exec(commange);
      }

      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
      String line;

      while ((line = reader.readLine()) != null) {
        serverWriter.println(line);
      }

      debugErrorStatements(process);

      int exitCode = process.waitFor();
      assert exitCode == 0;
    } catch (Exception ex) {
      serverWriter.println(ex.getMessage());
    }
  }

  private static void debugErrorStatements(Process process) {
    BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
    String line;

    try {
      while ((line = reader.readLine()) != null) {
        serverWriter.println(line);
      }
    } catch (IOException ex) {
      Logger.getLogger(NetcatServer.class.getName()).log(Level.SEVERE, null, ex);
    }

  }
}
