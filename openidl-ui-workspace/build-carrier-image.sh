echo "# # # # # #   B u i l d i n g   ( openidl/carrier-ui )  D o c k e r  I m a g e  # # # # # #"
rm -rf node_modules

echo "=====> copy .npmrc from home directory."
cp ~/.npmrc npmrc

docker build --build-arg PROJECT=carrier -t openidl/carrier-ui .

echo "=====> delete npmrc"
rm -rf npmrc
