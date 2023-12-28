echo "# # # # # #   B u i l d i n g   ( openidl/ui )  D o c k e r  I m a g e  # # # # # #"
rm -rf node_modules

echo "=====> copy .npmrc from home directory."
cp ~/.npmrc npmrc

docker build --build-arg PROJECT=aais -t openidl/ui .

echo "=====> delete npmrc"
rm -rf npmrc
