import { Tooltip } from "@/components/ui/tooltip";
import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { HStack, VStack, Flex, Table, Icon } from "@chakra-ui/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Checker, dateFormatter } from "@/lib/utils";
import BallLoader from "@/components/ui/loading-ball";
import { useState, useEffect, useRef } from "react";
import { toaster } from "@/components/ui/toaster";
import { ArticleModalCreate } from "@/components/article/article-modal-create";
import { ArticleModalEdit } from "@/components/article/article-modal-edit";
import CKEditorAdmin from "@/components/ui/admin/ckeditor-admin";

function Article() {
  const [articlesData, setArticlesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);

  async function getArticles() {
    try {
      setLoading(true);
      const res = await fetch(`/api/articles`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status != 200) {
        setLoading(false);
        // setInviteError(true);
      } else {
        const resData = await res.json();
        setArticlesData(resData);
        setLoading(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      // setInviteError(true);
    }
  }

  async function deleteArticle(id) {
    setLoading(true);
    const resData = await fetch("/api/articles?id=" + id, {
      method: "DELETE",
    });
    if (resData.status != 200) {
      toaster.create({
        description: `Ein Fehler ist aufgetreten`,
        type: "error",
      });
      setLoading(false);
    } else {
      toaster.create({
        description: `Artikel gelöscht.`,
        type: "success",
      });
      getArticles();
      setLoading(false);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <VStack py={5} gap={5} placeItems={"flex-start"}>
      {articlesData && !loading ? (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Titel</Table.ColumnHeader>
              <Table.ColumnHeader>Inhalt</Table.ColumnHeader>
              <Table.ColumnHeader>Datum</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {articlesData &&
              articlesData.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.content}</Table.Cell>
                  <Table.Cell>{item.date}</Table.Cell>
                  <Table.Cell textAlign="end">
                    <HStack placeContent={"end"} gap={4}>
                      <Tooltip content="Bearbeiten">
                        <Icon
                          size={"sm"}
                          onClick={() => {
                            setSelectedArticle(item);
                            // setDialogOpen(true);
                            setOpenEditModal(true);
                          }}
                        >
                          <PencilSquareIcon />
                        </Icon>
                      </Tooltip>
                      <Tooltip content="Löschen">
                        <Icon
                          size={"sm"}
                          color="red.600"
                          onClick={() => deleteArticle(item.id)}
                        >
                          <TrashIcon />
                        </Icon>
                      </Tooltip>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Flex justify="center" w={"100%"}>
          <BallLoader />
        </Flex>
      )}
      <ArticleModalCreate getArticles={getArticles} />
      <ArticleModalEdit
        article={selectedArticle}
        open={openEditModal}
        setOpen={setOpenEditModal}
        getArticles={getArticles}
      />
      <CKEditorAdmin />
    </VStack>
  );
}

export default Article;

Article.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
