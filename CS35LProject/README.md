# PennyPig

## Overview
**PennyPig** is an expense tracking web application that helps users manage their expenses and income, set budget goals, and visualize their progress with graphs, while also allowing for transaction history search, updates, and deletions.

## Features
- Track Expenses and Income by Category: Easily categorize your expenses and income to see where your money is going.
- Set and Adjust Budget Goals: Create and modify budget goals to fit your financial plans and stay on track.
- Graph Displays Progress: Visualize your spending with graphs that show your progress toward monthly budget limits.
- Transaction History Page: View a detailed history of all your transactions in one place.
- Search by Category: Quickly find past purchases by searching through categories.
- Download or Email Excel File of Transactions: Export your transaction history to an Excel file for offline access or email it directly.
- Update or Delete Transactions: Make changes to your records by updating or deleting transactions as needed.
- Personal Settings: Customize your user experience with personal settings tailored to your preferences.

## Tech Stack
**Back-end:** Express.js, Node.js, Microsoft SQL Database  
**Front-end:** React.js

## Installation and Setup

### Prerequisites
1. **Microsoft SQL Server**: Download and install the free Developer edition [here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
2. **SQL Server 2022 Manager**: Install for Windows, Linux, or Docker containers.

### Steps to Replicate the Project
1. **Setup SQL Server Database**:
    - Open SQL Server 2022 Manager and create a new query.
    - Copy and paste the code from `Database-structure-SQL/budget_structure.sql` and execute the query to create the `BUDGET` database.

2. **Clone the Repository**:
    ```bash
    git clone https://github.com/JennMena/CS35LProject
    cd CS35LProject
    ```

3. **Configure Database Credentials**:
    - Modify `constant.js` to include your database information and credentials.

4. **Setup Backend**:
    ```bash
    cd Backend
    npm install
    nodemon ./src/app.js
    ```

5. **Setup Frontend**:
    ```bash
    cd ../Frontend
    npm install
    npm start
    ```

## Usage
Once the setup is complete, the project should be fully connected and operational. Create your user account and start managing your expenses!

## Database Structure
The database schema for PennyPig is designed to manage user information, roles, permissions, categories, budgets, and financial transactions. Currently, the only view implemented is for users, but the project is designed with future work in mind, such as adding admin and auditor views.

### Tables
- **AppUser**: Stores user information including personal details and credentials.
- **AppRole**: Defines different roles within the application.
- **Permission**: Lists various permissions that can be assigned to roles.
- **AppRolePermission**: Links roles with their respective permissions.
- **AppUserAppRole**: Associates users with their assigned roles.
- **Category**: Manages expense and income categories for users.
- **FinancialTransaction**: Records all financial transactions made by users.
- **FinancialTransactionFixed**: Manages fixed financial transactions that occur regularly.
- **Budget**: Stores budget details for each user, including monthly and yearly budgets.

### Future Implementations
- **Admin View**: Will allow for administrative control over user accounts, roles, and permissions.
- **Auditor View**: Will enable auditing capabilities to review and manage financial transactions and user activities.


## Front-End Structure
The front end of PennyPig is built using React and includes the following main pages:

- **Login Page**: Allows users to log into their accounts.
- **Sign Up Page**: Enables new users to create an account.
- **Home Page**: Provides an overview and quick access to the main features of the app, including budget tracking and expense input.
- **History Page**: Displays a list of expenses and incomes, with options to edit, delete, and search through past transactions.
- **Categories Page**: Allows users to add or delete categories for organizing their expenses and incomes.
- **User Information Page**: Displays user information and account status.


