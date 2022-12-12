import { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPopularProperties } from "../../redux/actions/popularAction";
import PopularCard from "./PopularCard";
import { SkeletonCard } from "./SkeletonCard";
import { popArr } from "./SkeletonCard";

const Popular = () => {
  const dispatch = useDispatch();
  const { isLoading, popularProperties } = useSelector(
    (state) => state.popular
  );

  useEffect(() => {
    dispatch(getPopularProperties());
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 16 }}>Popular</Text>
        <Text style={{ color: "#2972FE", fontWeight: "600" }}>See all</Text>
      </View>
      {popularProperties.length ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={popularProperties}
          renderItem={({ item }) => {
            return (
              <PopularCard
                name={item.title}
                img={item.coverPhoto}
                type={item.purpose}
                price={`$ ${item.price}`}
                location={item.location}
                area={item.area}
                baths={item.baths}
                rooms={item.rooms}
                id={item.id}
                lng={item.lng}
                owner={item.contactName}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={popArr}
          renderItem={({ item }) => <SkeletonCard />}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 10,
  },
});
export default Popular;
