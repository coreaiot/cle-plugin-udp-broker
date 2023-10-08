package com.coreaiot.examples;

import java.io.*;
import java.net.*;
import java.util.Timer;
import java.util.TimerTask;
import java.util.zip.*;

public class UdpClientSideCodeExample {
  public static void main(String[] args) {
    String hostname = "192.168.123.186";
    int port = 55555;

    try {
      InetAddress address = InetAddress.getByName(hostname);
      try (DatagramSocket socket = new DatagramSocket()) {
        String msg = "subscribe:zlib";
        byte[] buff = msg.getBytes();
        DatagramPacket request = new DatagramPacket(buff, buff.length, address, port);

        Timer timer = new Timer();
        TimerTask task = new TimerTask() {
          public void run() {
            try {
              socket.send(request);
            } catch (IOException e) {
              e.printStackTrace();
            }
          }
        };
        timer.schedule(task, 0, 30000);

        while (true) {
          byte[] buffer = new byte[65535];
          DatagramPacket response = new DatagramPacket(buffer, buffer.length);
          socket.receive(response);

          try {
            byte[] unzipped = unzip(buffer);
            String json = new String(unzipped, 0, unzipped.length);
            System.out.println(json);
          } catch (Exception e) {
          }
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static byte[] unzip(byte[] data) throws IOException, DataFormatException {
    Inflater inf = new Inflater();
    inf.setInput(data);
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    byte[] buffer = new byte[1024];
    while (!inf.finished()) {
      int count = inf.inflate(buffer);
      baos.write(buffer, 0, count);
    }
    baos.close();
    return baos.toByteArray();
  }
}