package com.journalplanner.journalplanner.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.journalplanner.journalplanner.model.Resource;
import com.journalplanner.journalplanner.service.ResourceService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static junit.framework.TestCase.assertEquals;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyObject;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ResourceControllerTest {

    private static final String url = "/api/resource/";

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private ResourceService resourceService;

    @InjectMocks
    private ResourceController resourceController;

    private ObjectMapper mapper = new ObjectMapper();

    Set<Resource> testResources = new HashSet<>();

    @Before
    public void setup(){
        mockMvc = MockMvcBuilders.standaloneSetup(resourceController).build();

        Resource testResource = new Resource();
        testResource.setId(1);
        testResource.setName("testResource1");
        testResource.setMemo("testing memo 1");

        Resource testResource2 = new Resource();
        testResource2.setId(2);
        testResource2.setName("test Resource 2");
        testResource2.setMemo("testing memo 2");

        testResources = Stream.of(testResource, testResource2).collect(Collectors.toSet());
        given(resourceService.getAllResources()).willReturn(testResources);
        given(resourceService.getResourceById(1)).willReturn(testResource);
        given(resourceService.getResourceById(2)).willReturn(testResource2);
    }

    @Test
    public void testGetAllResources() throws Exception {
        given(resourceService.getAllResources()).willReturn(testResources);
        MvcResult result = mockMvc.perform(get(url+"all"))
                .andReturn();

        Set<Resource> resultResources = mapper.readValue(result.getResponse().getContentAsString(),
                mapper.getTypeFactory().constructCollectionType(Set.class, Resource.class));
        assertEquals(resultResources.size(), testResources.size());
    }

    @Test
    public void testGetAllResourcesAndStatus200() throws Exception {
        mockMvc.perform(get(url+"all"))
                .andExpect(status().is2xxSuccessful()).andReturn();
    }

    @Test
    public void testGetAllResourcesAndStatus400() throws Exception {
        //added an extra l to the url as the url does not exist
        MvcResult result = mockMvc.perform(get(url+"alll"))
                .andExpect(status().is4xxClientError()).andReturn();

        assertEquals(result.getResponse().getStatus(), 400);
    }

    @Test
    public void testGetResourcesById() throws Exception {
        Resource testResource3 = new Resource();
        testResource3.setId(3);
        testResource3.setName("test resource 3");
        testResource3.setMemo("testing resource 3");

        given(resourceService.getResourceById(anyInt())).willReturn(testResource3);

        MvcResult result = mockMvc.perform(get(url+"3")).andReturn();

        Resource resultResources = mapper.readValue(result.getResponse().getContentAsString(), Resource.class);

        assertThat(resultResources).isEqualToComparingFieldByField(testResource3);
    }

    @Test
    public void testGetResourcesByIdAndStatus200() throws Exception {
        Resource testResource4 = new Resource();
        testResource4.setId(4);
        testResource4.setName("test resource 4");
        testResource4.setMemo("testing resource 4");

        given(resourceService.getResourceById(anyInt())).willReturn(testResource4);

        MvcResult result = mockMvc.perform(get(url+"3"))
                .andExpect(status().is2xxSuccessful()).andReturn();

        assertEquals(result.getResponse().getStatus(), 200);
    }

    @Test
    public void testGetResourcesByIdAndStatus404() throws Exception {
        MvcResult result = mockMvc.perform(get(url+"10"))
                .andExpect(status().is4xxClientError()).andReturn();

        assertEquals(result.getResponse().getStatus(), 404);
    }

    @Test
    public void testPostResource() throws Exception {
        Resource testResource4 = new Resource();
        testResource4.setName("test post resource");
        testResource4.setUrl("testing post resource");

        String resource4JSON = mapper.writeValueAsString(testResource4);

        given(resourceService.createResource(anyObject())).willReturn(testResource4);

        MvcResult result = mockMvc.perform(post(url+"add").contentType(MediaType.APPLICATION_JSON).content(resource4JSON)).andExpect(status().is2xxSuccessful()).andReturn();

        Resource resultResources = mapper.readValue(result.getResponse().getContentAsString(), Resource.class);

        assertThat(resultResources).isEqualToComparingFieldByField(testResource4);
    }

    @Test
    public void testPostResourceAndStatus201() throws Exception {
        Resource testResource4 = new Resource();
        testResource4.setName("test post resource");
        testResource4.setUrl("testing post resource");

        String resource4JSON = mapper.writeValueAsString(testResource4);

        given(resourceService.createResource(anyObject())).willReturn(testResource4);

        MvcResult result = mockMvc.perform(post(url+"add").contentType(MediaType.APPLICATION_JSON).content(resource4JSON)).andExpect(status().is2xxSuccessful()).andReturn();

        assertEquals(result.getResponse().getStatus(), 201);
    }

    @Test
    public void testPostResourceWithoutUrlAndStatus406() throws Exception {
        Resource testResource4 = new Resource();
        testResource4.setName("test post resource");

        String resource4JSON = mapper.writeValueAsString(testResource4);

        given(resourceService.createResource(anyObject())).willReturn(testResource4);

        MvcResult result = mockMvc.perform(post(url+"add").contentType(MediaType.APPLICATION_JSON).content(resource4JSON)).andExpect(status().is4xxClientError()).andReturn();

        assertEquals(result.getResponse().getStatus(), 406);
    }

    @Test
    public void testPostResourceWithoutNameAndStatus406() throws Exception {
        Resource testResource4 = new Resource();
        testResource4.setUrl("test post resource");

        String resource4JSON = mapper.writeValueAsString(testResource4);

        given(resourceService.createResource(anyObject())).willReturn(testResource4);

        MvcResult result = mockMvc.perform(post(url+"add").contentType(MediaType.APPLICATION_JSON).content(resource4JSON)).andExpect(status().is4xxClientError()).andReturn();

        assertEquals(result.getResponse().getStatus(), 406);
    }

    @Test
    public void testPostResourceWithoutNameAndUrlAndStatus406() throws Exception {
        Resource testResource4 = new Resource();

        String resource4JSON = mapper.writeValueAsString(testResource4);

        given(resourceService.createResource(anyObject())).willReturn(testResource4);

        MvcResult result = mockMvc.perform(post(url+"add").contentType(MediaType.APPLICATION_JSON).content(resource4JSON)).andExpect(status().is4xxClientError()).andReturn();

        assertEquals(result.getResponse().getStatus(), 406);
    }

    @Test
    public void testPostResourceWithExistingIdAndStatus406() throws Exception {
        Resource testResource4 = new Resource();
        testResource4.setId(1);

        String resource4JSON = mapper.writeValueAsString(testResource4);

        given(resourceService.createResource(anyObject())).willReturn(testResource4);

        MvcResult result = mockMvc.perform(post(url+"add").contentType(MediaType.APPLICATION_JSON).content(resource4JSON)).andExpect(status().is4xxClientError()).andReturn();

        assertEquals(result.getResponse().getStatus(), 406);
        assertEquals(result.getResponse().getContentAsString(), "The Resource With that Idea Already Exist");
    }

    @Test
    public void testPostResourceWithNonExistingIdAndStatus406() throws Exception {
        Resource testResource5 = new Resource();
        testResource5.setId(5);

        String resource4JSON = mapper.writeValueAsString(testResource5);

        given(resourceService.createResource(anyObject())).willReturn(testResource5);

        MvcResult result = mockMvc.perform(post(url+"add").contentType(MediaType.APPLICATION_JSON).content(resource4JSON)).andExpect(status().is4xxClientError()).andReturn();

        assertEquals(result.getResponse().getStatus(), 406);
        assertEquals(result.getResponse().getContentAsString(), "Please Remove Id");
    }
}
