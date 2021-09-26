package SecureConnection;

import java.io.ByteArrayOutputStream;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;


public class SshConnection {

    public static boolean connectViaSsh(String username, String password,
                                     String host, int port, String command) throws Exception {

        Session session = null;
        ChannelExec channel = null;
        boolean isConnectionSuccessful = false;

        try {
            session = new JSch().getSession(username, host, port);
            session.setPassword(password);
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect();

            channel = (ChannelExec) session.openChannel("exec");
            channel.setCommand(command);
            ByteArrayOutputStream responseStream = new ByteArrayOutputStream();
            channel.setOutputStream(responseStream);
            channel.connect();

            while (channel.isConnected()) {
                Thread.sleep(100);
            }

            String responseString = new String(responseStream.toByteArray());
            System.out.println(responseString);
            isConnectionSuccessful = true;
            return isConnectionSuccessful;
        } finally {
            if (session != null) {
                session.disconnect();
            }
            if (channel != null) {
                channel.disconnect();
            }
        }
    }

    public static void main(String[] args) throws Exception {
        if(SshConnection.connectViaSsh("guru", "********", "bluenose.cs.dal.ca",22,  "ls -a")) {
            System.out.println("Connection was successful");
        }
        else {
            System.out.println("Connection was not successful.");
        }
    }
}
