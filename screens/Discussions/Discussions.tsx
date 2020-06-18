import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageSourcePropType,
} from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Layout, Text } from "../shareComponents";

const { width } = Dimensions.get("screen");

const DATA = gql`
  {
    recipientChannels {
      users {
        id
        nom
        prenom
        avatar
      }
      channelIds
      lastMessages
    }
  }
`;

interface ItemProps {
  name: string;
  message: string;
  image: ImageSourcePropType;
  channelId: string;
  navigation: any;
}

function Item({ name, message, image, channelId, navigation }: ItemProps) {
  return (
    <>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Discussion", { channelId, name })}
      >
        <View style={{ flex: 0.25 }}>
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              overflow: "hidden",
              margin: "auto",
            }}
          >
            <Image
              source={
                image || require("../../assets/images/default-user-image.png")
              }
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.75, alignSelf: "flex-start" }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default function Discussion({ navigation }: { navigation: any }) {
  return (
    <Query query={DATA} pollInterval={1000} fetchPolicy={"cache-and-network"}>
      {({
        loading,
        data,
      }: {
        loading: boolean;
        data: { recipientChannels: any };
      }) => {
        if (data) {
          const users = data.recipientChannels.users;
          const areChats =
            data.recipientChannels.users.length === 0 ? false : true;
          const lastMessages = data.recipientChannels.lastMessages;
          const channelIds = data.recipientChannels.channelIds;
          for (var i = 0; i < users.length; i++) {
            users[i]["message"] = JSON.parse(lastMessages)[i]["text"];
            users[i]["channelId"] = channelIds[i];
          }

          return (
            <Layout title={"Discussions"}>
              <>
                {loading && <ActivityIndicator size="large" color="black" />}
                {areChats ? (
                  <FlatList
                    data={users}
                    renderItem={({ item }) => (
                      <Item
                        name={
                          item.prenom.replace(
                            /^./,
                            item.prenom[0].toUpperCase()
                          ) +
                          " " +
                          item.nom.charAt(0) +
                          "."
                        }
                        message={item.message}
                        image={item.avatar}
                        navigation={navigation}
                        channelId={item.channelId}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                  />
                ) : null}
                {!areChats && <Text>Aucune discussion actuellement</Text>}
              </>
            </Layout>
          );
        }

        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <SafeAreaView>
              <Text style={{ paddingBottom: 20 }}>
                Une erreur est survenue au chargement des messages.
              </Text>
              <Text style={{ paddingBottom: 50, fontWeight: "bold" }}>
                Vérifier votre connexion internet.
              </Text>
              <ActivityIndicator size="large" color="black" />
            </SafeAreaView>
          </View>
        );
      }}
    </Query>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 0,
    borderBottomColor: "rgba(0,0,0,0.5)",
    borderBottomWidth: 0.5,
    width: width,
    height: 100,
  },
  name: {
    fontFamily: "josefinRegular",
    fontSize: 20,
  },
  message: {
    fontFamily: "josefinRegular",
    fontSize: 14,
  },
});
