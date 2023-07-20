package tanjiro;
import java.sql.*;
public class Practice {

	public static void main(String[] args)throws Exception{ try {
    	Class.forName("com.mysql.cj.Driver");
    	String DB_URL = "jdbc:mysql://localhostr:3306/jega?user=root&password=953617106033@Lj";
        Connection connection = DriverManager.getConnection(DB_URL);
        initializeDatabase(connection);

        while (true) {
            System.out.println("Options:");
            System.out.println("1. Create User");
            System.out.println("2. Show Users");
            System.out.println("3. Exit");

            int choice = Integer.parseInt(System.console().readLine("Enter your choice (1/2/3): "));

            if (choice == 1) {
                User user = createUser();
                saveUserToDatabase(connection, user);
                System.out.println("User created successfully!\n");
            } else if (choice == 2) {
                System.out.println("Saved Users:");
                showUsersFromDatabase(connection);
            } else if (choice == 3) {
                System.out.println("Exiting the program.");
                break;
            } else {
                System.out.println("Invalid choice. Please try again.\n");
            }
        }

        connection.close();
    } catch (SQLException e) {
        e.printStackTrace();
    }
}
	 private static void initializeDatabase(Connection connection) throws SQLException {
	        String createUserTableSQL = "CREATE TABLE IF NOT EXISTS users (" +
	                "id INTEGER PRIMARY KEY," +
	                "username TEXT NOT NULL," +
	                "password TEXT NOT NULL," +
	                "email TEXT NOT NULL," +
	                "account_id INTEGER," +
	                "FOREIGN KEY (account_id) REFERENCES accounts(id))";

	        String createAccountTableSQL = "CREATE TABLE IF NOT EXISTS accounts (" +
	                "id INTEGER PRIMARY KEY," +
	                "account_number TEXT NOT NULL," +
	                "account_balance REAL NOT NULL)";

	        Statement statement = connection.createStatement();
	        statement.execute(createUserTableSQL);
	        statement.execute(createAccountTableSQL);
	        statement.close();
	    }
	 private static User createUser() {
	        int userId = Integer.parseInt(System.console().readLine("Enter User ID: "));
	        String userName = System.console().readLine("Enter Username: ");
	        String password = System.console().readLine("Enter Password: ");
	        String email = System.console().readLine("Enter Email: ");

	        int accountId = Integer.parseInt(System.console().readLine("Enter Account ID: "));
	        String accountNumber = System.console().readLine("Enter Account Number: ");
	        double accountBalance = Double.parseDouble(System.console().readLine("Enter Account Balance: "));
	        Account account = new Account(accountId, accountNumber, accountBalance);
	        return new User(userId, userName, password, email, account);
	    }
	 private static void saveUserToDatabase(Connection connection, User user) throws SQLException {
	        String insertAccountSQL = "INSERT INTO accounts (id, account_number, account_balance) VALUES (?, ?, ?)";
	        String insertUserSQL = "INSERT INTO users (id, username, password, email, account) VALUES (?, ?, ?, ?, ?)";

	        PreparedStatement accountStatement = connection.prepareStatement(insertAccountSQL);
	        accountStatement.setInt(1,user.account.id);
	        accountStatement.setString(2, user.account.accountNumber);
	        accountStatement.setDouble(3, user.account.accountBalance);

	        PreparedStatement userStatement = connection.prepareStatement(insertUserSQL);
	        userStatement.setInt(1, user.id);
	        userStatement.setString(2, user.userName);
	        userStatement.setString(3, user.password);
	        userStatement.setString(4, user.email);
	        userStatement.setInt(5, user.account.id);

	        connection.setAutoCommit(false);
	        accountStatement.executeUpdate();
	        userStatement.executeUpdate();
	        connection.commit();

	        accountStatement.close();
	        userStatement.close();
	    }
	 private static void showUsersFromDatabase(Connection connection) throws SQLException {
	        String selectUsersSQL = "SELECT users.id, username, password, email, account_id, account_number, account_balance FROM users " +
	                "JOIN accounts ON users.account_id = accounts.id";

	        Statement statement = connection.createStatement();
	        ResultSet resultSet = statement.executeQuery(selectUsersSQL);

	        while (resultSet.next()) {
	            int userId = resultSet.getInt("id");
	            String userName = resultSet.getString("username");
	            String password = resultSet.getString("password");
	            String email = resultSet.getString("email");
	            int accountId = resultSet.getInt("account_id");
	            String accountNumber = resultSet.getString("account_number");
	            double accountBalance = resultSet.getDouble("account_balance");
	            Account account = new Account(accountId, accountNumber, accountBalance);
	            User user = new User(userId, userName, password, email, account);

	            System.out.println(user);
	            System.out.println("---------------------------");
	        }

	        resultSet.close();
	        statement.close();
	    }


	class Account {
	    private int id;
	    private String accountNumber;
	    private double accountBalance;

	    public  Account(int id, String accountNumber, double accountBalance) {
	        this.id = id;
	        this.accountNumber = accountNumber;
	        this.accountBalance = accountBalance;
	    }

	    @Override
	    public String toString() {
	        return "Account ID: " + id + "\nAccount Number: " + accountNumber + "\nAccount Balance: " + accountBalance;
	    }
	}

	class User {
	    private int id;
	    private String userName;
	    private String password;
	    private String email;
	    private Account account;

	    public User(int id, String userName, String password, String email, Account account) {
	        this.id = id;
	        this.userName = userName;
	        this.password = password;
	        this.email = email;
	        this.account = account;
	    }

	    @Override
	    public String toString() {
	        return "User ID: " + id + "\nUsername: " + userName + "\nEmail: " + email + "\n" + account;
	    }
	}
}