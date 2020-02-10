
import java.io.BufferedWriter;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Modified server code for Dexter demo
 */
public class NetcatReceiver
{

  private static final int PORT = 8888;

  public static void main(String[] args)
  {
    initializeServer();
  }

  public static void initializeServer()
  {
    try {
      DatagramSocket ds = new DatagramSocket(PORT);
      byte[] receive = new byte[65535];

      DatagramPacket DpReceive = null;
      SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");

      while (true) {

        DpReceive = new DatagramPacket(receive, receive.length);
        FileWriter fileWriter = new FileWriter("outputLog.txt", true);
        BufferedWriter writer = new BufferedWriter(fileWriter);
        Date date = new Date(System.currentTimeMillis());

        ds.receive(DpReceive);
        System.out.println("Logged data: " + data(receive));

        if (data(receive).toString().equals("Stop")) {
          System.out.println("Stopping server");
          break;
        }

        writer.write(formatter.format(date).toString() + " Logged transform: " + data(receive));
        writer.newLine();

        writer.close();
        fileWriter.close();
        receive = new byte[65535];
      }

    }
    catch (Exception e) {
      e.printStackTrace();
    }
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
