package tools;

import pojos.User;

import java.sql.*;

/**
 * Database Handler help us to acceess database
 * if the system is changed by user,
 * the final values must be edited.
 */

public class DatabaseHandler {

    private Connection connection = null;
    private Statement statement = null;
    private PreparedStatement preparedStatement = null;
    private ResultSet resultSet = null;

    static final String JDBC_DRVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/red_owl";

    static final String USERNAME = "root";
    static final String PASSWORD = "test123";

    public DatabaseHandler(){

    }


    public User getUser(String username, String password){
        this.openConnection();
        int ID, role;
        String email;
        String query = "SELECT ID,role,email FROM users where username = '" + username + "' and password = '" + password + "'";
        System.out.println("Executing the query: " + query );
        try {
            resultSet = statement.executeQuery(query);
            while(resultSet.next()){
                ID = resultSet.getInt("ID");
                role = resultSet.getInt("role");
                email = resultSet.getString("email");
                return new User(ID,role,username,password,email);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        this.closeConnection();
        return null;
    }

    /**
     * to keep log
     * @param user
     * @param log
     */
    public void insertLog(User user,String log){
        this.openConnection();

        String query = "INSERT INTO log VALUES(NULL, '" + user.getID() + "', '" + log + "');";
        System.out.println(query);
        try{
            statement.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        this.closeConnection();
    }

    private void openConnection(){
        try {
            Class.forName(JDBC_DRVER).newInstance();
            connection = DriverManager.getConnection(DB_URL,USERNAME,PASSWORD);
            statement = connection.createStatement();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        }
    }

    private void closeConnection(){
        try{
            if(statement != null){
                statement.close();
            }
            if(connection != null){
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }



}
