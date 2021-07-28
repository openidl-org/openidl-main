echo "# # # # # #   B u i l d i n g   ( openidl/utilities )  D o c k e r  I m a g e  # # # # # #"
rm -rf node_modules

echo "=====> copy .npmrc from home directory."
cp ~/.npmrc npmrc

docker build -t openidl/utilities .

echo "=====> delete npmrc"
rm npmrc
