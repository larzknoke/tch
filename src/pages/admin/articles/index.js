import { Tooltip } from "@/components/ui/tooltip";
import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { HStack, VStack, Flex, Table, Icon, Button } from "@chakra-ui/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Checker, dateFormatter } from "@/lib/utils";
import BallLoader from "@/components/ui/loading-ball";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { ArticleModalCreate } from "@/components/article/article-modal-create";
import { ArticleModalEdit } from "@/components/article/article-modal-edit";
import Link from "next/link";

function Article() {
  const [articlesData, setArticlesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  async function getArticles() {
    try {
      setLoading(true);
      const res = await fetch(`/api/articles`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status !== 200) {
        setLoading(false);
      } else {
        const resData = await res.json();
        setArticlesData(resData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Err", error);
    }
  }

  async function deleteArticle(id) {
    setLoading(true);
    const res = await fetch("/api/articles?id=" + id, {
      method: "DELETE",
    });

    if (res.status !== 200) {
      toaster.create({
        description: `Ein Fehler ist aufgetreten`,
        type: "error",
      });
    } else {
      getArticles();
      toaster.create({
        description: `Artikel gelöscht.`,
        type: "success",
      });
    }

    setLoading(false);
  }

  function handleEditOpen(article) {
    setSelectedArticle(article);
    setOpenEditModal(true);
  }

  function handleEditClose() {
    setOpenEditModal(false);
    setSelectedArticle(null);
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <VStack py={5} gap={5} placeItems="flex-start">
      {articlesData && !loading ? (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Titel</Table.ColumnHeader>
              <Table.ColumnHeader>Teaser</Table.ColumnHeader>
              <Table.ColumnHeader>Slug</Table.ColumnHeader>
              <Table.ColumnHeader>Datum</Table.ColumnHeader>
              <Table.ColumnHeader>Aktiv</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {articlesData.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.teaser}</Table.Cell>
                <Table.Cell>{item.slug}</Table.Cell>
                <Table.Cell>{dateFormatter(item.date, false)}</Table.Cell>
                <Table.Cell>{Checker(item.active)}</Table.Cell>
                <Table.Cell textAlign="end">
                  <HStack placeContent="end" gap={4}>
                    <Tooltip content="Bearbeiten">
                      <Link href={`/admin/articles/edit/${item.id}`} passHref>
                        <Icon size="sm">
                          <PencilSquareIcon />
                        </Icon>
                      </Link>
                    </Tooltip>
                    <Tooltip content="Löschen">
                      <Icon
                        size="sm"
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
        <Flex justify="center" w="100%">
          <BallLoader />
        </Flex>
      )}

      <Link href="/admin/articles/create" passHref>
        <Button colorPalette={"green"}>Neuer Artikel</Button>
      </Link>
      {/* <ArticleModalCreate getArticles={getArticles} /> */}

      {selectedArticle && (
        <ArticleModalEdit
          article={selectedArticle}
          isOpen={openEditModal}
          onClose={handleEditClose}
          getArticles={getArticles}
        />
      )}
    </VStack>
  );
}

export default Article;

Article.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
