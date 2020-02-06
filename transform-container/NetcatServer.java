
import java.io.*;
import static java.lang.System.exit;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
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

    try {
      DatagramSocket ds = new DatagramSocket();

      InetAddress ip = InetAddress.getByName("172.17.0.3");
      byte buf[] = null;

      String inp = "" + output[0] + " " + output[1] + " " + output[2];
      buf = inp.getBytes();
      DatagramPacket DpSend = new DatagramPacket(buf, buf.length, ip, 8888);

      ds.send(DpSend);

      if (inp.equals("Stop")) {
        exit(0);
      }

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
