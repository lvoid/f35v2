
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;
import java.net.DatagramPacket;
import java.net.DatagramSocket;

/**
 * Modified server code for Dexter demo
 */
public class NetcatReceiver
{

  private static Scanner scanner;
  private static Socket connectionSocket;
  private static InputStream serverInput;
  private static OutputStream serverOuput;
  private static PrintWriter serverWriter;
  private static final int PORT = 8888;

  public static void main(String[] args)
  {
    initializeServer();
  }

  public static void initializeServer()
  {
    try{
      DatagramSocket ds = new DatagramSocket(8888);
      byte[] receive = new byte[65535];

      DatagramPacket DpReceive = null;
      while (true) {

        DpReceive = new DatagramPacket(receive, receive.length);

        ds.receive(DpReceive);
        System.out.println(data(receive));

        if (data(receive).toString().equals("Stop")) {
          System.out.println("Stopping server");
          break;
        }

        receive = new byte[65535];
      }
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }

  private static void readServerInput()
  {
    String line = scanner.nextLine();
    System.out.println(line);
  }

  public static StringBuilder data(byte[] a)
  {
    if (a == null) {
      return null;
    }
    StringBuilder ret = new StringBuilder();
    int i = 0;
    while (a[i] != 0) {
      ret.append((char) a[i]);
      i++;
    }
    return ret;
  }
}
