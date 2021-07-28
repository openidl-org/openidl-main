echo "# # # # # #   B u i l d i n g   ( openidl/data-call-processor )  D o c k e r  I m a g e  # # # # # #"
rm -rf node_modules

echo "=====> copy .npmrc from home directory."
cp ~/.npmrc npmrc

docker build -t openidl/data-call-processor .

echo "=====> delete npmrc"
rm npmrc
