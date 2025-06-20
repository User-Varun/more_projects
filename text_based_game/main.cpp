#include <iostream>
#include <cstdlib>
using namespace std;

bool gameStart = false;
bool haveTorch = false;
class Game
{
public:
    void clearScreen()
    {
        system("cls");
    }
    void pauseProgram()
    {
        system("pause");
    }

    void addSpace()
    {
        cout << endl;

        return;
    }

    void startGame()
    {
        cout << "press s to start the game or any other key to exit: ";
        char input;
        cin >> input;
        // condition for looping the game.
        if (input == 's' || input == 'S')
        {
            gameStart = true;
        }
        else
        {
            gameStart = false;
            addSpace();
            cout << "You choose to exit from game. exiting from game.." << endl;
            addSpace();
            pauseProgram();
            return;
        }

        clearScreen();
    }

    void storyStart()
    {
        clearScreen();
        addSpace();
        cout << "Game: Find your way out. by varun" << endl;
        addSpace();
        cout << "you are in deserted castle, there is no source of light appearing , your aim is to find a way from this castle , through facing the unknown of the castle..." << endl;
        addSpace();
    }
    void eastRoom()
    {
        cout << "you go East" << endl;
        cout << "you are in a dark room." << endl;
        addSpace();

        cout << "where to go?" << endl;

        cout << "1. explore the room" << endl;
        cout << "2. go back to previous room" << endl;
        addSpace();

        cout << "Choose: ";
        int playerInput;
        cin >> playerInput;

        if (playerInput == 1)
        {
            clearScreen();
            cout << "you explore the room..." << endl;
            cout << "you found a chest!" << endl;

            addSpace();
            cout << "what to do?" << endl;
            cout << "1. open the chest" << endl;
            cout << "2. explore the room further" << endl;
            addSpace();
            cout << "Choose: ";
            int playerInput2;
            cin >> playerInput2;

            if (playerInput2 == 1)
            {
                cout << "you try to open the chest" << endl;
                pauseProgram();
            }

            if (playerInput2 == 2)
            {
                cout << "you choose to explore the room further..." << endl;
                pauseProgram();
            }

            if (playerInput2 != 1 && playerInput2 != 2)
            {
                cout << "you choose wrong input, choose again" << endl;
                pauseProgram();
                eastRoom();
            }
        }
        if (playerInput == 2)
        {
            clearScreen();
            cout << "you go to previous location..." << endl;
            addSpace();
            startingRoom();
        }

        if (playerInput != 1 && playerInput != 2)
        {
            cout << "you choose wrong input , choose again" << endl;
            pauseProgram();
            clearScreen();
            eastRoom();
        }
    }

    void westRoom()
    {
        cout << "You go West" << endl;
        cout << "you see a crack in the walls..." << endl;
        addSpace();
        cout << "what do you do? " << endl;

        cout << "1. pass through cracked wall" << endl;
        cout << "2. go back to previous location" << endl;
        addSpace();

        cout << "choose : ";
        int inputChoice2;
        cin >> inputChoice2;
        addSpace();
        clearScreen();

        if (inputChoice2 == 1)
        {
            cout << "YOU WIN" << endl;
            addSpace();

            startGame();
            storyStart();
            startingRoom();
        }

        if (inputChoice2 == 2)
        {
            startingRoom();
        }

        if (inputChoice2 != 1 && inputChoice2 != 2)
        {
            cout << "you choose wrong input, choose again" << endl;
            pauseProgram();
            clearScreen();
            // startingRoom();
        }
    }

    void startingRoom()
    {

        if (haveTorch == false)
        {

            cout << "the room you are in, is dark.. in order to see you need to find something that can provide light" << endl;
            addSpace();

            cout << "what to do? (choose using according key)" << endl;
            cout << "1.explore the room" << endl;
            cout << "2.rest for a while.." << endl;

            addSpace();
            cout << "Choose: ";
            int userChoice;
            cin >> userChoice;

            clearScreen();
            if (userChoice == 1)
            {
                cout << "you choose to explore the room.." << endl;
                addSpace();
                cout << "you find a torch!" << endl;

                addSpace();

                cout << "what to do? (choose using according key)" << endl;
                cout << "1. pick up the torch" << endl;
                cout << "2. don't pick up the torch" << endl;

                addSpace();
                cout << "Choose: ";
                int userChoice;
                cin >> userChoice;

                clearScreen();
                if (userChoice == 1)
                {
                    haveTorch = true;
                    cout << "you pick the toch" << endl;

                    pauseProgram();
                }

                if (userChoice == 2)
                {
                    haveTorch = false;
                    cout << "you choose to not pick the torch" << endl;
                    pauseProgram();
                }

                if (userChoice != 1 && userChoice != 2)
                {
                    cout << "wrong input, choose again.." << endl;
                    pauseProgram();
                    clearScreen();
                    startingRoom();
                }
            }
            if (userChoice == 2)
            {
                cout << "you choose to rest here for a while..." << endl;
                pauseProgram();
            }
        }

        addSpace();
        cout << "there are 2 paths u see, one on your left and other on your right. (choose using according key): " << endl;
        addSpace();

        cout << "1. Door to the east" << endl;
        cout << "2. Door to the west" << endl;
        addSpace();

        cout << "choose : ";
        int inputChoice;
        cin >> inputChoice;
        addSpace();

        clearScreen();

        // go to east
        if (inputChoice == 1)
        {
            // enter into east Room
            eastRoom();

            // temporary , will continue building this gate
            pauseProgram();
        }
        // go to west
        if (inputChoice == 2)
        {
            // enter the west room
            westRoom();
        }
    }
};

class Player : public Game
{
private:
    int hp;

public:
    Player()
    {
        this->hp = 100; // initially hp to 100;
    }

    void changeHp(int changeTo)
    {
        this->hp = changeTo;
        cout << "hp updated." << endl;
    }

    void displayHp()
    {
        cout << this->hp << endl;
    }
};

class Dragon : public Game
{
private:
    int dragonHp;

public:
    Dragon()
    {
        this->dragonHp = 500; // initially hp to 100;
    }

    void changeHp(int changeTo)
    {
        this->dragonHp = changeTo;
        cout << "dragon hp updated." << endl;
    }

    void displayHp()
    {
        cout << this->dragonHp << endl;
    }
};

int main()
{

    Player newPlayer;

    newPlayer.storyStart();

    newPlayer.startGame();

    while (gameStart)
    {
        newPlayer.startingRoom();
    }
}