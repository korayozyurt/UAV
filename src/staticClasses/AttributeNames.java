package staticClasses;

/**
 * writing the attribute names as String format is not clear way
 * in session.
 * So, each session attribute names must be keep in the class
 * in static form to access from anywhere.
 */

public class AttributeNames {
    public static final String USER = "user";
    public static final String USER_NAME = "username";
    public static final String PASSWORD = "password";
    public static final String DATABASE_HANDLER = "databaseHandler";
    public static final String WARNING_MESSAGE = "warning_message";
    public static final String UAV_HOST_ADDRESS = "uav_host_address";
    public static final String UAV_HOST_PORT_NUMBER = "uav_host_port_number";
}
